<script lang="ts">
	import { Input, Button } from 'flowbite-svelte';
	import { pb } from '../pocketbase';
	import { toast } from '$lib/app/stores';
	import { page } from '$app/stores';

	let email: string;
	let password: string;
	let passwordConfirm: string;
	let errorState = false;

	async function signUp() {
		try {
			const data = {
				email,
				password,
				passwordConfirm
			};
			const createdUser = await pb.collection('users').create(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function login() {
		const authData = await pb.collection('users').authWithPassword(email, password);
	}

	async function onSubmit(e) {
		try {
			await signUp();
			await login();
			$toast.text = 'Registration successful';
			setTimeout(() => {
				$toast.text = undefined;
			}, 3000);
			goto(`/login`);
		} catch (e) {
			console.error('Error registering user');
			errorState = true;
		}
	}
</script>

<div class="rounded px-8 py-6 text-left shadow-lg dark:bg-gray-100 w-full md:w-1/3">
	<h3 class="text-center text-2xl font-bold">Create an Account</h3>
	<p class="text-center">
		Already have an account? <a class="text-primary-700" href="/login">Login</a>
	</p>
	
	<form on:submit|preventDefault class="mt-4">
		{#if errorState}
			<p class="text-red-500">There was an issue signing up</p>
		{/if}
		<div>
			<label class="block" for="email">Email</label>
			<Input id="email" type="text" bind:value={email} placeholder="email@example.com" />
		</div>
		<div class="mt-4">
			<label class="block" for="password">Password</label>
			<Input id="password" type="password" bind:value={password} placeholder="Password" />
		</div>
		<div class="mt-4">
			<label class="block" for="confirm-password">Confirm Password</label>
			<Input
				id="confirm-password"
				type="password"
				bind:value={passwordConfirm}
				placeholder="Confirm Password"
			/>
		</div>
		<p>
			By clicking "register", you agree to our <a class="text-primary-700" href="/termsOfService"
				>terms of service</a
			>
		</p>
		<div class="mt-4 flex items-center justify-center gap-5">
			<Button on:click={onSubmit} type="button">Register</Button>
		</div>
	</form>
</div>
