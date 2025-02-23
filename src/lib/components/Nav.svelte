<script>
	import { currentPage } from '$lib/globalState.svelte.js';
</script>

<nav>
	<div class="my-8 flex flex-wrap justify-center gap-2">
		{#each Array(12) as _, i}
			<button
				class="rounded-lg px-4 py-2 transition-colors {currentPage.value === i + 1
					? 'bg-blue-600 hover:bg-blue-700'
					: 'bg-gray-600 hover:bg-gray-700'} text-white"
				on:click={() => (currentPage.value = i + 1)}
			>
				Page {i + 1}
			</button>
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
