<script>
	import { currentPage } from '$lib/globalState.svelte.js';
	import { Icon } from 'svelte-icons-pack';
	import { RiArrowsArrowDropLeftLine, RiArrowsArrowDropRightLine } from 'svelte-icons-pack/ri';

	// Handles navigation with keys
	function handleKeyNavigation(event) {
		if (event.key === 'ArrowLeft') {
			currentPage.value = Math.max(1, currentPage.value - 1);
		} else if (['ArrowRight', ' ', 'Enter'].includes(event.key)) {
			event.preventDefault(); // Prevents spacebar from scrolling down
			currentPage.value = Math.min(12, currentPage.value + 1);
		}
	}
</script>

<!-- Key Navigation -->
<svelte:window onkeydown={handleKeyNavigation} />

<!-- Tab Navigation -->
<nav class="absolute top-0 my-8 w-full px-4">
	<div class="flex h-[1rem] items-center gap-1">
		{#each Array(12) as _, i (i)}
			<button
				class="nav-tab {currentPage.value === i + 1
					? 'bg-purple-500 hover:bg-purple-500'
					: 'bg-gray-500 opacity-30'} "
				onclick={() => (currentPage.value = i + 1)}
			>
				<!-- Page {i + 1} -->
			</button>
		{/each}
	</div>
</nav>

<!-- Button Navigation -->
<div class="absolute top-[50vh] flex w-full translate-y-[-50%] justify-between">
	<button
		class="nav-button translate-x-[-50%] justify-end rounded-e-[3rem] hover:translate-x-[-30%]"
		onclick={() => (currentPage.value = Math.max(1, currentPage.value - 1))}
	>
		<Icon src={RiArrowsArrowDropLeftLine} viewBox="0 0 1024 1024" color="white" size="48" />
	</button>
	<button
		class="nav-button translate-x-[50%] justify-start rounded-s-[3rem] hover:translate-x-[30%]"
		onclick={() => (currentPage.value = Math.min(12, currentPage.value + 1))}
	>
		<Icon src={RiArrowsArrowDropRightLine} viewBox="0 0 1024 1024" color="white" size="48" />
	</button>
</div>

<!-- Nav bar stuff if needed
<div class="topnav" role="navigation">
	<a class="active" href="#home">What makes a genre?</a>
	<a href="javascript:void(0);" class="icon" onclick="myFunction()">
		<i class="fa fa-bars"></i>
	</a>
</div> -->

<style lang="postcss">
	@reference "tailwindcss/theme";

	/* prettier-ignore */
	.nav-tab {
		@apply h-[0.4rem]
		       grow 
		       rounded
					 hover:h-[1rem]
					 transition-all duration-300
					 text-white 
					 ;
	}

	/* prettier-ignore */
	.nav-button {
		@apply h-[6rem] w-[6rem]
           z-50
					 flex items-center
		       pointer-events-auto cursor-pointer
					 bg-gray-500 opacity-50
					 hover:bg-purple-500 hover:opacity-80
					 transition-all
					 ;
	}
</style>
