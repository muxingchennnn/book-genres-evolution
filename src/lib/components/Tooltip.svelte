<script>
	import { timeFormat } from 'd3-time-format';
	let { hoveredNode } = $props();

	// console.log(hoveredNode);

	const xNudge = 80;
	const yNudge = 20;
</script>

<div
	class="tooltip tooltip-rim"
	style="left: {hoveredNode.x + xNudge}px; top: {hoveredNode.y + yNudge}px;"
>
	<div class="flex gap-[1rem]">
		<img src={hoveredNode.coverImg} class="h-auto w-[120px] object-cover" alt="book cover image" />
		<div class="flex max-w-[232px] flex-col">
			<p>{hoveredNode.title}</p>
			<p>{hoveredNode.author}</p>
			<p>
				{hoveredNode.genres}
			</p>
			<p>
				Rating: {hoveredNode.rating}/5
			</p>
			<p>
				BBE Votes: {hoveredNode.bbeVotes}
			</p>
			<p>
				BBE Score: {hoveredNode.bbeScore}
			</p>
			<p>{timeFormat('%B %d, %Y')(hoveredNode.date)}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	/* .tooltip-rim {
		border-image: linear-gradient(160deg, rgba(44, 44, 44, 0.4), rgba(44, 44, 44, 0)) 1 !important;
	} */

	/* prettier-ignore */
	.tooltip {
		@apply absolute max-w-[400px]
           rounded border border-solid border-[#2c2c2c] bg-[rgb(44,44,44)]/[.4] p-[1rem] backdrop-blur-sm;
	}
</style>
