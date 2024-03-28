<script>
import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/svelte";

/** @type {import("@prismicio/client").Content.BannerSocialSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class='py-24 text-center'>
	<div class="px-24 text-2xl md:text-4xl md:px-0">
		<PrismicRichText field={slice.primary.text} />
	</div>
	<div class='flex items-baseline justify-center gap-12 pt-8'>
		{#each slice.items as item, index}
			<PrismicLink field={item.link}><PrismicImage field={item.icon} /></PrismicLink>
		{/each }
	</div>
</section>

<style>
	section :global(img) {
		/* width: 10px;
		height: 10px; */
	}
	
</style>class='pt-8