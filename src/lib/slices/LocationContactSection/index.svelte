<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.LocationContactSectionSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices
</section>
