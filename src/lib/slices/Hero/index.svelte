<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/svelte";

	/** @type {import("@prismicio/client").Content.HeroSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="mx-8 mt-8">
		<PrismicImage field={slice.primary.image} />
	</div>
	<PrismicRichText field={slice.primary.title} />
	<div class="mx-8 mt-4 md:px-64 md:mt-8">
		<PrismicRichText field={slice.primary.text} />
	</div>
	<div class="mt-8 text-center">
		<PrismicLink field={slice.primary.link}>{slice.primary.label}</PrismicLink>
	</div>
</section>

<style>
	section :global(img) {
		object-fit: cover;
		aspect-ratio: 50/51;	
	}

	@media (min-width: 1024px) {
		section :global(img) {
			aspect-ratio: 7/2;
		}
	}

	section :global(h1),
	section :global(p) {
		text-align: center;
	}

	section :global(h1) {
		padding-top: 1.5rem;
	}

	section :global(p) {
	font-size: clamp(.75rem, 1.4vw, 1.5rem);
	}

	section :global(a) {
		color: #3D0404;
		border: 1px solid #3D0404;
		padding: .4rem 2rem .8rem 2rem;
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 300;
	}
</style>