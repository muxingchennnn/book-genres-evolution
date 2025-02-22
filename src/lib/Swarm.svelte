<script>
    import { happinessScore } from './data/happiness-score';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent } from 'd3-array';

	const margin = { top: 0, right: 0, bottom: 20, left: 0 };
	let width = $state(400);
	let height = $state(400);
	let chartWidth = $derived(width - margin.left - margin.right);
	let chartHeight = $derived(height - margin.top - margin.bottom);

	let xScale = $derived.by(() => {
		return scaleLinear()
			.domain(extent(happinessScore, (d) => d.happiness))
			.range([0, chartWidth]);
	});

	let yScale = $derived.by(() => {
		return scaleBand()
			.domain(happinessScore.map((d) => d.continent))
			.range([0, chartHeight])
			.paddingOuter(0.5);
	});

	$inspect(xScale, yScale);

	let nodes = $state([]);

	const simulation = forceSimulation(happinessScore);
	simulation.on('tick', () => {
		nodes = simulation.nodes();
	});

	$effect(() => {
		simulation
			.force(
				'x',
				forceX()
					.x((d) => xScale(d.happiness))
					.strength(0.8)
			)
			.force(
				'y',
				forceY()
					.y((d) => yScale(d.continent))
					.strength(0.2)
			)
			.force('collide', forceCollide().radius(5))
			.alpha(0.3)
			.alphaDecay(0.0005)
			.restart();
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			{#each nodes as node}
				<circle cx={node.x} cy={node.y} r={5} fill="steelblue" />
			{/each}
		</g>
	</svg>
</div>

<style>
	.chart-container {
		position: relative;
		overflow: hidden;
	}
</style>