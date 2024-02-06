<script lang="ts">
	import { AccordionItem, Accordion, Card } from 'flowbite-svelte';
</script>

<div class="my-4 flex justify-center">
	<Card img="https://placehold.co/300x300/EEE/31343C" href="/" horizontal size="lg">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Big text
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</p>
	</Card>
</div>
<div class="my-4 flex justify-center">
	<Accordion class="w-full max-w-2xl">
		<AccordionItem>
			<span slot="header">Sample header 1</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>Look at this list:</p>
			<ul>
				<li>Example 1</li>
				<li>Example 2</li>
				<li>Example 3</li>
			</ul>
		</AccordionItem>
		<AccordionItem>
			<span slot="header">Sample header 2</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
		</AccordionItem>
	</Accordion>
</div>
