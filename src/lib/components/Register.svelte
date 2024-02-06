<script lang="ts">
	import { Input, Button } from 'flowbite-svelte';
	import { pb } from '../pocketbase';
	import { toast } from '$lib/app/stores';
	import { page } from '$app/stores';

	let username: string;
	let password: string;
	let passwordConfirm: string;

	async function signUp() {
		try {
			const data = {
				username,
				password,
				passwordConfirm
			};
			const createdUser = await pb.collection('users').create(data);
		} catch (err) {
			console.error(err);
		}
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
		}
	}
</script>

<div class="mt-4 bg-gray-100 bg-white px-8 py-6 text-left shadow-lg">
	<h3 class="text-center text-2xl font-bold">Create an Account</h3>
	<form on:submit|preventDefault class="mt-4">
		<div>
			<label class="block" for="username">Username</label>
			<Input id="username" type="text" bind:value={username} placeholder="Username" />
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
		<div class="mt-4 flex items-center justify-between gap-5">
			<Button on:click={onSubmit} type="button">Register</Button>
			<Button class="" href="/login">Login</Button>
		</div>
	</form>
</div>
