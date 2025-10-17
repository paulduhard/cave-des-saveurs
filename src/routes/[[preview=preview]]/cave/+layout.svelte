<script>
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

	export let data;
</script>

<slot />

{#if data.cavePage?.data?.slices && data.cavePage.data.slices.length > 0}
	<SliceZone slices={data.cavePage.data.slices} {components} />
{/if}
