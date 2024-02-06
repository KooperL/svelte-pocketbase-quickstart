<script lang="ts">
	import 'flowbite';
	import '../../app.pcss';
	import { Input, Button } from 'flowbite-svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from '$lib/app/stores';

	let username: string;
	let password: string;
	let returnTo = $page.url.searchParams.get('returnTo');

	async function login() {
		const authData = await pb.collection('users').authWithPassword(username, password);
	}

	async function onSubmit(e) {
		try {
			await login();
			$toast.text = 'Logging in....';
			setTimeout(() => {
				$toast.text = undefined;
			}, 3000);
			goto(`/`);
		} catch (e) {
			console.error('Error authenticating user', username);
		}
	}
</script>

<div class="rounded px-8 py-6 text-left shadow-lg dark:bg-gray-100">
	<h3 class="text-center text-2xl font-bold">Login to your account</h3>
	<form on:submit|preventDefault class="mt-4">
		<div>
			<label class="block" for="email">Email</label>
			<Input id="email" type="email" bind:value={username} placeholder="Email" />
		</div>
		<div class="mt-4">
			<label class="block" for="password">Password</label>
			<Input id="password" bind:value={password} type="password" placeholder="Password" />
		</div>
		<div class="mt-4 flex items-center justify-between">
			<Button class="" type="button" on:click={onSubmit}>Login</Button>
			<Button class="" href="/register">Register</Button>
		</div>
	</form>
</div>
