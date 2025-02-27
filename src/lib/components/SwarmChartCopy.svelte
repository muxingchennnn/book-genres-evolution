<script>
	import { forceSimulation, forceX, forceY, forceCollide, forceManyBody } from 'd3-force';
	import { scaleLinear, scaleTime, scaleBand, scaleSqrt } from 'd3-scale';
	import { extent, max } from 'd3-array';
	import { currentPage } from '$lib/globalState.svelte.js';
	import SwarmXAxis from '$lib/components/SwarmXAxis.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let { data } = $props();
	// $inspect(data);
	const scifiData = data.filter((d) =>
		['Science Fiction'].some((genre) => d.genres.includes(genre))
	);
	// $inspect(extent(scifiData, (d) => d.rating).at(1));

	const callOutData = scifiData.filter(
		(d) =>
			d.title === 'The Martian (The Martian #1)' || d.title === "Ender's Game (Ender's Saga #1)"
	);
	$inspect(callOutData);

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

	let rScale = $derived.by(() => {
		return (
			scaleSqrt()
				// .domain([0, extent(scifiData, (d) => d.rating).at(1)])
				// .domain([3.5, 5])
				.domain(extent(scifiData, (d) => d.rating))
				.range([2, 6])
		);
	});

	let nodes = $state([]);
	let hoveredNode = $state(null);

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
					.strength(0.8)
			)
			.force('y', forceY(height / 2).strength(0.09))
			.force(
				'collide',
				forceCollide()
					.radius((d) => rScale(d.rating) + 1)
					.strength(1)
			)
			.force(
				'charge',
				forceManyBody().strength(-4) // add repulsion between nodes
			)
			.alpha(1) // start with full energy
			.alphaDecay(0.02) // faster decay to stabilize quicker
			.alphaMin(0.01) // stop at higher threshold
			.restart();

		if (currentPage.value === 4) {
			hoveredNode = callOutData.at(1);
		}

		return () => {
			simulation.stop();
		};
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<!-- chart title -->
<h1 class="text-[2rem] font-[700]">
	{currentPage.value === 12 ? 'Choose a genre to explore' : 'Sci-fi books from 70s to 20s'}
</h1>
<!-- chart body -->
<div class="chart-container fixed top-0 left-0" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g transform={`translate(${chartMargin.left}, ${chartMargin.top})`}>
			<SwarmXAxis {xScale} {chartWidth} {chartHeight} />
			{#each nodes as node}
				<circle
					cx={node.x}
					cy={node.y}
					r={rScale(node.rating)}
					fill={'#F8F8F8'}
					opacity={hoveredNode ? (hoveredNode.id === node.id ? 1 : 0.6) : 1}
					onmouseover={() => (hoveredNode = node)}
					onmouseleave={() => (hoveredNode = null)}
				/>
			{/each}
		</g>
	</svg>
	<!-- tooltip -->
	{#if hoveredNode}
		<Tooltip {hoveredNode} />
	{/if}
</div>

<style>
	.chart-container {
		position: relative;
		overflow: hidden;
	}

	circle {
		cursor: pointer;
		transition:
			fill 100ms ease,
			opacity 100ms ease;
	}
</style>
