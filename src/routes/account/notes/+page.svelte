<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Card, Button, Skeleton } from 'flowbite-svelte';
	import { site } from '$lib/config';
	import NotePreviewCard from '$lib/components/NotePreviewCard.svelte';

	let notes = pb.collection('notes').getList(1, 50, {
		filter: `user = '${$currentUser?.model?.id}'`
	});

	onMount(async () => {});
</script>

<div class="flex w-full max-w-full flex-col items-center justify-center">
	{#await notes}
		<Card class="flex w-full w-full max-w-full flex-col ">
			<Skeleton size="md" class="my-8" />
			<Skeleton size="md" class="my-8" />
		</Card>
	{:then data}
		{#each data.items as note}
			<NotePreviewCard id={note.id} title={note.title} content={note.content} />
		{/each}
	{/await}
</div>
