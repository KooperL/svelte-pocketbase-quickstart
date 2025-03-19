<script lang="ts">
	import 'flowbite';
	import '../../app.pcss';
	import { Input, Button } from 'flowbite-svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from '$lib/app/stores';

	let email: string;
	let password: string;
	let returnTo = $page.url.searchParams.get('returnTo');
	let errorState = false;

	async function login() {
		const authData = await pb.collection('users').authWithPassword(email, password);
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
			console.error('Error authenticating user', email);
			errorState = true;
		}
	}
</script>

<div class="rounded px-8 py-6 text-left shadow-lg dark:bg-gray-100 w-full md:w-1/3">
	<h3 class="text-center text-2xl font-bold">Login to your account</h3>
	<p class="text-center">
		Don't have an account? <a class="text-primary-700" href="/register">Register</a>
	</p>
	<form on:submit|preventDefault class="mt-4">
		{#if errorState}
			<p class="text-red-500">Invalid username or password</p>
		{/if}
		<div>
			<label class="block" for="email">Email</label>
			<Input id="email" type="email" bind:value={email} placeholder="Email" />
		</div>
		<div class="mt-4">
			<label class="block" for="password">Password</label>
			<Input id="password" bind:value={password} type="password" placeholder="Password" />
		</div>
		<div class="mt-4 flex items-center justify-center">
			<Button class="" type="button" on:click={onSubmit}>Login</Button>
		</div>
	</form>
</div>
