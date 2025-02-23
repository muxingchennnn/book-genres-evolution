<script>
	import { currentPage } from '$lib/globalState.svelte.js';
</script>

<nav>
	<div class="my-[2rem] flex justify-between">
		{#each Array(12) as _, i}
			{#if currentPage.value === i + 1}
				<button class="selected-button bg-blue-500" onclick={() => (currentPage.value = i + 1)}>
					Page {i + 1}
				</button>
			{:else}
				<button
					class="rounded bg-gray-500 p-2 text-white"
					onclick={() => (currentPage.value = i + 1)}
				>
					Page {i + 1}
				</button>
			{/if}
		{/each}
	</div>
</nav>

<!-- Nav bar stuff if needed
<div class="topnav" role="navigation">
	<a class="active" href="#home">What makes a genre?</a>
	<a href="javascript:void(0);" class="icon" onclick="myFunction()">
		<i class="fa fa-bars"></i>
	</a>
</div> -->

<style>
	.selected-button {
		/* background-color: #2563eb; */
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}
</style>
