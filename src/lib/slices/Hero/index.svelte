<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/svelte";

	/** @type {import("@prismicio/client").Content.HeroSlice} */
	export let slice;
</script>

{#if slice.variation === 'default'}
<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="text-center mb-28">
	<div class="mx-8 mt-8">
		<PrismicImage field={slice.primary.image} />
	</div>
	<div class="pt-8 text-2xl md:text-4xl">
		<PrismicRichText field={slice.primary.title} />
	</div>
	<div class="text-xs md:text-lg mx-8 mt-4 md:px-[25%] md:mt-8">
		<PrismicRichText field={slice.primary.text} />
	</div>
	<div class="mt-8 text-base font-light text-center text-primary">
		<PrismicLink field={slice.primary.link}>{slice.primary.label}</PrismicLink>
	</div>
</section>
{:else if slice.variation === 'heroTextOnly'}
<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="pb-8 text-center bg-secondary">
	<div class="pt-8 text-2xl md:text-4xl">
		<PrismicRichText field={slice.primary.title} />
	</div>
	<div class="text-xs md:text-lg mx-8 mt-4 md:px-[25%] md:mt-8">
		<PrismicRichText field={slice.primary.text} />
	</div>
</section>
{/if}
<style>
	section :global(img) {
		object-fit: cover;
		aspect-ratio: 50/51;	
	}

	@media (min-width: 1280px) {
		section :global(img) {
			aspect-ratio: 7/2;
		}
	}

	section :global(a) {
		border: .5px solid;
		padding: .4rem 1.5rem .6rem 1.5rem;
	}
</style>