<script>
	import SwarmChartCopy from '$lib/components/SwarmChartCopy.svelte';
	import { currentPage } from '$lib/globalState.svelte.js';
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

	$inspect(currentPage.value);
</script>

<div class="mb-[4rem]"></div>
<RenderedPage />

{#if currentPage.value === 1}
	<SwarmChartCopy data={originalData} />
{/if}

<style lang="postcss">
	@reference "tailwindcss/theme";

	:global(body) {
		position: relative;
		background-color: black;
	}
</style>
