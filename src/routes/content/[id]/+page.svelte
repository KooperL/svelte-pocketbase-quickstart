<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { metadata } from '$lib/app/stores';
	import type { PageData } from './$types';
	import CryptoJS from 'crypto-js';
	import {
		Input,
		Button,
		Rating,
		Star,
		Skeleton,
		Label,
		Textarea,
		InputAddon,
		Spinner,
		ButtonGroup
	} from 'flowbite-svelte';
	import { pocketbaseCustomEndpoints, fetchCustomEndpoint } from '../../../api/pocketbaseCustom';
	import { FireOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { toast } from '$lib/app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let newComment = '';
	let unsubscribe: () => void;
	let content = data.success && data?.record?.content;

	onMount(async () => {
		$metadata.title = data.record.title;
		document.querySelector('#content').innerHTML = sanitizeHtml(content);
	});

	onDestroy(async () => {
		$metadata.title = undefined;
	});

	async function fetchComments() {
		if (!data.success) {
			return;
		}

		let commentsResp = await pb.collection('comments').getList(1, 50, {
			filter: `post = "${data.record.id}"`,
			expand: 'user'
		});
		return commentsResp.items;
	}

	let comments = fetchComments();

	onDestroy(async () => {
		try {
		} catch (e) {}
	});

	async function share() {
		await fetchCustomEndpoint(pocketbaseCustomEndpoints.share, data.record.id);
	}
	async function addComment() {
		if (newComment.trim() === '') {
			return;
		}
		const payload = {
			content: newComment,
			user: $currentUser?.model?.id,
			post: data?.record?.id
		};
		const createdMessage = await pb.collection('comments').create(payload);
		comments = fetchComments();
		newComment = '';
	}

	async function report() {
		if ($currentUser) {
			const payload = {
				message: `Reporting postId: ${data.record.id}`,
				user: $currentUser.model.id,
				type: 'report'
			};

			const record = await pb.collection('enquiries').create(payload);
			$toast.text =
				'Post has been reported. Our moderation team will review it and make the necessary action.';
			$toast.icon = 'ExclamationCircleOutline';
			setTimeout(() => {
				$toast.text = undefined;
				$toast.icon = undefined;
			}, 3000);
		} else {
			goto(`/login`);
		}
	}
</script>

{#if data.success && data?.record?.content}
	<div class="p-4">
		<h2 class="mb-4 text-2xl font-bold dark:text-white">
			{data?.record?.title?.trim?.()?.length ? data?.record?.title : '[no title]'}
		</h2>
		<div class="flex flex-row dark:text-white">
			<p>By:&nbsp;</p>
			<h5 class="font-bold">
				{data.record?.expand?.user?.username?.trim?.()?.length
					? data.record.expand.user.username
					: 'Someone'}
			</h5>
		</div>

		<div class="mt-4 flex flex-row justify-between">
			<div class="mb-6">
				<ButtonGroup class="flex h-full w-full">
					<Input
						id="url"
						type="text"
						onClick="this.setSelectionRange(0, this.value.length)"
						class="flex-2"
						value={`/content/${data.record.id}`}
					/>
					{#if $currentUser?.model?.id}
						<Button
							class="m-0 max-h-full w-full flex-1 text-gray-500 dark:text-gray-400"
							on:click={share}>Share</Button
						>
					{:else}
						<Button class="m-0 max-h-full w-full flex-1 text-gray-500 dark:text-gray-400"
							>Copy</Button
						>
					{/if}
				</ButtonGroup>
			</div>
		</div>

		{#if content}
			<div
				class="mx-auto w-full break-words rounded bg-gray-50 px-4 py-6 font-sans text-base leading-relaxed text-gray-900 dark:bg-gray-800 dark:text-gray-300"
				id="content"
			></div>
		{/if}

		<div class="mt-4">
			<h3 class="text-xl font-semibold dark:text-white">Comments</h3>
			<Textarea
				bind:value={newComment}
				class="w-full rounded border border-gray-300 p-2"
				rows="2"
				placeholder="Add a comment..."
			></Textarea>
			<div class="flex flex-row justify-between">
				<Button on:click={addComment} class="mt-2 rounded px-4 py-2 font-bold text-white">
					Comment
				</Button>
				{#if $currentUser?.token}
					<Button on:click={report} color="red" class="mt-2 rounded px-4 py-2 font-bold text-white">
						report
					</Button>
				{/if}
			</div>

			<div class="mt-4">
				<div>
					{#await comments}
						<Skeleton size="sm" class="my-8" />
					{:then data}
						{#each data as comment}
							<div
								class="mb-2 mt-2 flex flex-col rounded border border-gray-300 p-3 dark:text-white"
							>
								<h5 class="font-bold">
									{comment?.expand?.user?.username?.trim?.()?.length
										? comment.expand.user.username
										: 'Someone'}
								</h5>
								<p>{comment.content}</p>
							</div>
						{/each}
					{/await}
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Yikes</p>
{/if}

<style>
	button {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
	}
	.filled {
		color: gold;
	}
	button:focus {
		outline: none;
	}
</style>
