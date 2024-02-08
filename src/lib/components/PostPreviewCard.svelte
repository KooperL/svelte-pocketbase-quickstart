<script>
	import { Card, Button, Skeleton } from 'flowbite-svelte';
	export let id;
	export let title;
	export let author;
	export let time;
	export let content;
</script>

<Card href={`/content/${id}`} class="flex w-full max-w-full flex-col">
	<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{title.trim().length ? title : '[No name]'}
	</p>
	<p
		class="custom_body_text overflow-hidden whitespace-nowrap font-normal leading-tight text-gray-700 dark:text-gray-400"
	>
		{content.substring(0, 50)}
	</p>
</Card>
