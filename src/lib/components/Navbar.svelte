<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		Label,
		Input,
		DarkMode,
		Checkbox
	} from 'flowbite-svelte';
	import { UserCircleOutline } from 'flowbite-svelte-icons';
	import { pb, currentUser } from '../pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { site } from '$lib/config';
	let formModal = true;
	const path = '/'; //$page?.url?.pathname
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{site.name}</span
		>
	</NavBrand>
	<div class="flex gap-3 md:order-2">
		<Button href={'/new'}>New post</Button>
		{#if $currentUser?.token}
			<Button
				on:click={async () => {
					await pb.authStore.clear();
					goto('/');
				}}>logout</Button
			>
			<Button
				href={`/account/profile`}
				outline={true}
				class="p-2 text-primary-700 hover:text-white"
				size="lg"
			>
				<UserCircleOutline class="h-5 w-5 " />
			</Button>
		{:else}
			<Button href={`/login`}>Login</Button>
			<Button href={`/register`}>Register</Button>
		{/if}
		<DarkMode />
	</div>
</Navbar>

<!--Modal bind:open={formModal} size="xs" autoclose={false} class="w-full bg-gray-100 absolute">
  </Modal -->
