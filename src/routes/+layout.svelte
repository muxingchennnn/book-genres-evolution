<script>
	import '../app.css';
	let { children } = $props();
	import Nav from '$lib/components/Nav.svelte';
	import { currentPage } from '$lib/globalState.svelte.js';
</script>

<Nav />
{@render children()}
