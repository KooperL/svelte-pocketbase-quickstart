<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import { Input, Button, ButtonGroup, Toggle, Textarea } from 'flowbite-svelte';
	import CryptoJS from 'crypto-js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as sanitizeHtml from 'sanitize-html';

	let userContent = '';
	let userContentTitle = '';
	let privateEnabled;

	onMount(() => {
		const options = {
			modules: {
				toolbar: '#toolbar'
			},
			theme: 'snow'
		};
		const container = document.getElementById('editor');
		const editor = new Quill(container, options);
	});

	async function saveContent() {
		const myEditor = document.querySelector('#editor');
		userContent = sanitizeHtml(myEditor.children[0].innerHTML);
		if (!userContent) {
			return;
		}
		const data = {
			content: userContent,
			user: $currentUser?.model?.id ?? undefined,
			title: userContentTitle,
			private: privateEnabled
		};
		const createdMessage = await pb.collection('posts').create(data);
		console.log('createdMessage', createdMessage);
		goto(`/content/${createdMessage.id}`);
	}
</script>

<div class="p-4">
	<Input
		bind:value={userContentTitle}
		type="text"
		class="mb-4 text-2xl font-bold"
		placeholder="Enter a title: "
	/>
	<div id="toolbar">
		<button class="ql-bold"></button>
		<button class="ql-italic"></button>
	</div>
	<div id="editor" class="dark:text-white"></div>

	{#if $currentUser.model}
		<Toggle
			on:click={() => (privateEnabled = !privateEnabled)}
			class="m-0 max-h-full w-full flex-1 text-gray-500 dark:text-gray-400">Private</Toggle
		>
	{/if}
	<Button
		on:click={saveContent}
		class="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
	>
		Save Content
	</Button>
</div>

<style>
	textarea {
		min-height: 150px;
	}
</style>
