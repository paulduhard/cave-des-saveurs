<script>

	import { PrismicRichText, PrismicLink } from "@prismicio/svelte";

	/** @type {import("@prismicio/client").Content.BannerReviewSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="text-center bg-secondary">
	<div class="px-24 pt-8 text-2xl underline decoration-1 underline-offset-8 md:text-4xl md:px-0">
		<PrismicRichText field={slice.primary.title} />
	</div>
	<div class='pt-20'>
		{#each slice.items as item, index}
		<div>
			<div class="uppercase">
				<PrismicRichText field={item.subtitle} />
			</div>
			<div class="pt-4">
				<PrismicRichText field={item.text} />
			</div>
		</div>
		{/each }
	</div>
	<div class="mt-8 text-base font-light text-center text-primary">
		<PrismicLink field={slice.primary.link}>{slice.primary.label}</PrismicLink>
	</div>
</section>

<style>
	section :global(a) {
	border: .5px solid;
	padding: .4rem 1.5rem .6rem 1.5rem;
}
</style>