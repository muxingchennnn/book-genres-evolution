<script>
	let { xScale, chartWidth, chartHeight } = $props();

	let ticks = $derived(xScale.ticks(5));
	// output: [1970, 1980, 1990, 2000, 2010, 2020]
</script>

<g>
	{#each ticks as tick, i (i)}
		<g class="tick" transform="translate({xScale(tick)}, 0)">
			<text x="8" y={chartHeight} fill="white">{tick.getFullYear().toString().slice(-2) + 's'}</text
			>
			<line x1="0" x2="0" y1="0" y2={chartHeight} stroke="gray"></line>
		</g>
	{/each}
</g>
