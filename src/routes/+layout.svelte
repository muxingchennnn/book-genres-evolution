<script>
	import '../app.css';
	import '@fontsource-variable/source-serif-4/opsz.css';
	import '@fontsource-variable/source-serif-4/opsz-italic.css';
	import '@fontsource-variable/geist';
	import Nav from '$lib/components/Nav.svelte';
	import { currentPage } from '$lib/globalState.svelte.js';

	let { children } = $props();
</script>

<Nav />
{@render children()}
