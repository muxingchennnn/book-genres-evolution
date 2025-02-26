<script>
	// import { happinessScore } from '../data/happiness-score';
	import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';
	import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
	import { extent, max } from 'd3-array';

	let { data } = $props();
	$inspect(data);
	const scifiData = data.filter((d) =>
		['Science Fiction'].some((genre) => d.genres.includes(genre))
	);
	$inspect(extent(scifiData, (d) => d.rating)[1]);

	const viewMargin = { top: 0, right: 48, bottom: 0, left: 48 };
	const chartMargin = { top: 0, right: 80, bottom: 20, left: 80 };
	let width = $state(400);
	let height = $state(400);
	let chartCtnWidth = $derived(width - viewMargin.left - viewMargin.right);
	let chartCtnHeight = $derived(height - viewMargin.top - viewMargin.bottom);
	let chartWidth = $derived(width - chartMargin.left - chartMargin.right);
	let chartHeight = $derived(height - chartMargin.top - chartMargin.bottom);

	let xScale = $derived.by(() => {
		return scaleTime()
			.domain(extent(scifiData, (d) => d.date))
			.range([0, chartWidth]);
	});

	// let yScale = $derived.by(() => {
	// 	return scaleBand()
	// 		.domain(scifiData.map((d) => d.genres))
	// 		.range([0, chartHeight])
	// 		.paddingOuter(0.5);
	// });

	let yScale = $derived.by(() => {
		return scaleLinear().domain([0, 5]).range([0, chartHeight]);
	});

	// $inspect(xScale, yScale);

	let nodes = $state([]);

	const simulation = forceSimulation(scifiData);
	simulation.on('tick', () => {
		nodes = simulation.nodes();
	});

	$effect(() => {
		simulation
			.force(
				'x',
				forceX()
					.x((d) => xScale(d.date))
					.strength(0.2)
			)
			// .force(
			// 	'y',
			// 	forceY()
			// 		.y((d) => yScale(d.rating))
			// 		.strength(0.1) // use rating for y-position
			// )
			.force(
				'y',
				forceY(height / 2).strength(0.1) // use rating for y-position
			)
			.force(
				'collide',
				forceCollide()
					.radius(7) // increased from 6
					.strength(0.7)
			)
			.force(
				'charge',
				forceManyBody().strength(-3) // add repulsion between nodes
			)
			.alpha(1) // start with full energy
			.alphaDecay(0.02) // faster decay to stabilize quicker
			.alphaMin(0.01) // stop at higher threshold
			.restart();
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div class="chart-container fixed top-0 left-0" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g transform={`translate(${chartMargin.left}, ${chartMargin.top})`}>
			{#each nodes as node}
				<circle cx={node.x} cy={node.y} r={5} fill="white" />
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
