<script lang="ts">
	import '../app.pcss';
	import { beforeNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		Toast,
		FooterLink
	} from 'flowbite-svelte';
	import { FireOutline, ExclamationCircleOutline, UserCircleOutline } from 'flowbite-svelte-icons';
	import Navbar from '$lib/components/Navbar.svelte';
	import { site } from '$lib/config';
	import { metadata, toast } from '$lib/app/stores';

	let formModal = false;
	$: title = ($metadata.title ? $metadata.title + ' | ' : '') + site.name;
	$: description = site.description;
	$: headline = $metadata.title;
	beforeNavigate(() => {});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="flex h-full flex-col">
	<header>
		<Navbar />
	</header>
	<main class="flex grow">
		<div class="max-h-full w-full">
			<slot />
			{#if $toast?.text}
				<Toast class="absolute bottom-2.5 left-1/2 mb-4 -translate-x-1/2">
					{#if $toast.icon === 'ExclamationCircleOutline'}
						<ExclamationCircleOutline
							slot="icon"
							class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
						/>
					{:else if $toast.icon === 'FireOutline'}
						<FireOutline
							slot="icon"
							class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
						/>
					{/if}
					{$toast.text}
				</Toast>
			{/if}
		</div>
	</main>
	<Footer class="flex justify-center">
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">Home</FooterLink>
			<FooterLink href="/about">About</FooterLink>
			<FooterLink href="/termsOfService">Terms of Service</FooterLink>
		</FooterLinkGroup>
	</Footer>
</div>

<style>
</style>
