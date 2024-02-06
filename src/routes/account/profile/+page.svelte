<script lang="ts">
	import { EditOutline } from 'flowbite-svelte-icons';
	import { Button } from 'flowbite-svelte';
	import { currentUser, pb } from '$lib/pocketbase';

	let username = $currentUser?.model?.username;
	let editingUsername = false;
	let tempUsername = username;

	const toggleEditUsername = () => {
		editingUsername = !editingUsername;
		tempUsername = username;
	};

	const saveUsername = async () => {
		username = tempUsername;
		editingUsername = false;
		const payload = {
			username: username
		};
		const record = await pb.collection('users').update($currentUser.model.id, payload);
	};

	const deleteAccount = () => {
		// await pb.collection('notes').delete($currentUser?.model?.id);
	};
</script>

<div class="flex flex-col p-4">
	<div class="flex items-center space-x-2">
		<span class="dark:text-white">Username:&nbsp;</span>
		{#if editingUsername}
			<input class="input input-bordered" type="text" bind:value={tempUsername} />
			<Button class="" on:click={saveUsername} size="lg">Save</Button>
		{:else}
			<span class="input input-bordered dark:text-white">{username}</span>
			<button class="" on:click={toggleEditUsername}>
				<EditOutline name="pencil-alt" class="h-5 w-5 text-primary-700" />
			</button>
		{/if}
	</div>
	<Button on:click={deleteAccount} color="red" class="mt-2 rounded px-4 py-2 font-bold text-white">
		Delete account
	</Button>
</div>

<style>
</style>
