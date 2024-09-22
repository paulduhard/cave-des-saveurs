<script>
	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<h1>Pouet</h1>

<SliceZone slices={data.page.data.slices} {components} />
