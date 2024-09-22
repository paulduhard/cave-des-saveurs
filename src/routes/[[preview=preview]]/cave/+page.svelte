<script>
	import { SliceZone, PrismicRichText } from '@prismicio/svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<PrismicRichText field={data.page.data.title} />
Page catalogue bouteilles

<SliceZone slices={data.page.data.slices} {components} />
