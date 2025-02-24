<script>
	import { currentPage } from '$lib/globalState.svelte.js';

	//
	function handleKeyNavigation(event) {
		if (event.key === 'ArrowLeft') {
			currentPage.value = Math.max(1, currentPage.value - 1);
		} else if (['ArrowRight', ' ', 'Enter'].includes(event.key)) {
			event.preventDefault(); // Prevents spacebar from scrolling down
			currentPage.value = Math.min(12, currentPage.value + 1);
		}
	}
</script>

<svelte:window onkeydown={handleKeyNavigation} />
<nav>
	<div class="my-8 flex flex-wrap justify-center gap-2">
		{#each Array(12) as _, i (i)}
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
</style>
