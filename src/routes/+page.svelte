<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Card, Button, Skeleton } from 'flowbite-svelte';
	import { site } from '$lib/config';
	import NotePreviewCard from '$lib/components/NotePreviewCard.svelte';

	let notes = pb.collection('notes').getList(1, 50, {
		filter: 'private = false'
	});

	onMount(async () => {});
</script>

<div class="flex w-full flex-col items-center justify-center">
	<Card class="max-w-200 mt-3  text-center" size="lg" padding="xl">
		<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
			Write some hero text here!
		</h5>
		<p class="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
			{site.description}
		</p>
		<div
			class="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse"
		>
			<Button href="/new">Make a new note</Button>
		</div>
	</Card>
	<h5 class="mb-2 mt-5 text-3xl font-bold text-gray-900 dark:text-white">Recent notes</h5>
	{#await notes}
		<Card class="flex w-full flex-col">
			<Skeleton size="md" class="my-8" />
			<Skeleton size="md" class="my-8" />
		</Card>
	{:then data}
		<div class="container mx-auto px-4">
			<div
				class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
			>
				{#each data.items as note}
					<div class="h-auto w-full">
						<NotePreviewCard
							id={note.id}
							title={note.title}
							content={note.content}
							class="h-10 w-full"
						/>
					</div>
				{/each}
			</div>
		</div>
	{/await}
</div>

<style>
	.custom_body_text {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
