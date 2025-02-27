<script>
	import SwarmChartCopy from '$lib/components/SwarmChartCopy.svelte';
	import { currentPage } from '$lib/globalState.svelte.js';
	import Grid from '$lib/components/Grid.svelte';
	import PageOne from '$lib/components/PageOne.svelte';
	import PageTwo from '$lib/components/PageTwo.svelte';
	import PageThree from '$lib/components/PageThree.svelte';
	import PageFour from '$lib/components/PageFour.svelte';

	// receive data from +page.js
	let { data } = $props();
	// deconstruct the data object received
	const { originalData, evolutionData, rankingData } = data;
	// dynamically render the page based on the 'currentPage' value
	const pages = [PageOne, PageTwo, PageThree, PageFour];
	const RenderedPage = $derived(pages[currentPage.value - 1]);

	// $inspect(currentPage.value);
</script>

<div class="mb-[5rem]"></div>
<!-- <Grid /> -->
<RenderedPage />

<div
	class="fixed top-0 left-0 {currentPage.value === 4 || currentPage.value === 11
		? 'visible'
		: 'invisible'}"
>
	<SwarmChartCopy data={originalData} />
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	:global(body) {
		position: relative;
		background-color: black;
		color: #f8f8f8;
		font-family:
			Geist Variable,
			sans-serif;
		font-size: 1rem;
	}

	/* prettier-ignore */
	:global(.grid-ctn) {
		@apply grid grid-cols-4 mx-[2rem] gap-x-[1rem] gap-y-[2px] max-w-[1440px] 
					 sm:grid-cols-8 sm:mx-[3rem] 
					 md:gap-x-[1.5rem]
					 lg:grid-cols-12 
					 2xl:mx-auto;
	}

	/* prettier-ignore */
	:global(p) {
		@apply text-[1rem] sm:text-[1.125rem];
	}

	/* prettier-ignore */
	:global(.italic-serif) {
		@apply font-serif italic text-[1.15rem] sm:text-[1.25rem];
	}

	/* prettier-ignore */
	:global(.italic-serif) {
		@apply font-serif italic text-[1.15rem] sm:text-[1.25rem];
	}

	/* .italic-serif {
		font-family: 'Source Serif 4 Variable', serif;
		font-style: italic;
		font-size: 1.15rem;
	} */
</style>
