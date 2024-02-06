<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { FolderOpenSolid, UserSolid } from 'flowbite-svelte-icons';
	import { currentUser, pb } from '$lib/pocketbase';

	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
	let notes = new Promise(() => {});

	if ($currentUser?.model?.id) {
		notes = pb.collection('notes').getList(1, 1, {
			filter: `user = '${$currentUser?.model?.id}'`
		});
	}
</script>

<div class="flex h-full w-full flex-row">
	<Sidebar {activeUrl} class="h-full">
		<SidebarWrapper class="h-full">
			<SidebarGroup>
				<SidebarItem
					label="Account"
					{spanClass}
					href="/account/profile"
					active={activeUrl === '/account/profile'}
				>
					<svelte:fragment slot="icon">
						<UserSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem
					label="Notes"
					{spanClass}
					href="/account/notes"
					active={activeUrl === '/account/notes'}
				>
					<svelte:fragment slot="icon">
						<FolderOpenSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary-200 p-3 text-sm font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-200"
						>
							{#await notes}
								0
							{:then items}
								{items.totalItems}
							{:catch err}
								{err}
							{/await}
						</span>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
	<div class="bg-red h-full grow">
		<slot />
	</div>
</div>
