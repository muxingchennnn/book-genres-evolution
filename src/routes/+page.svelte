<script>
	import SwarmChart from '$lib/components/SwarmChart.svelte';
	import { currentPage } from '$lib/globalState.svelte.js';
	import PageOne from '$lib/components/PageOne.svelte';
	import PageTwo from '$lib/components/PageTwo.svelte';
	import PageThree from '$lib/components/PageThree.svelte';
	import PageFour from '$lib/components/PageFour.svelte';

	let { data } = $props();
	const { originalData, evolutionData } = data;

	const pages = [PageOne, PageTwo, PageThree, PageFour];
	// $inspect(currentPage.value);
	const RenderedPage = $derived(pages[currentPage.value - 1]);
</script>

<!-- <header>
	<div class="container">
		<div class="row">
			<div class="col-lg-6 offset-lg-3">
				<h1>What makes a genre?</h1>

				<p></p>
			</div>
		</div>
	</div>
</header> -->

<RenderedPage />
<SwarmChart />

<style>
</style>
