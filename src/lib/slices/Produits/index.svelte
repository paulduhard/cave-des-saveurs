<script>

	import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/svelte";
	/** @type {import("@prismicio/client").Content.ProduitsSlice} */
	export let slice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}>
	<div class="items-center mt-8 mb-24 mr-12 font-light text-left md:gap-6 md:flex text-primary">
		<div class="basis-1/3">
			<PrismicLink field={slice.primary.link}>
				<div class="relative">
						<PrismicImage field={slice.primary.image} />
						<p class="absolute bottom-0 right-0 px-8 py-3 mx-8 mb-8 text-xs md:text-lg text-primary label">
							{slice.primary.label}
						</p>
			</PrismicLink>
		</div>
		<div class="basis-1/3">
			<PrismicLink field={slice.primary.link_2}>
				<div class="relative">
						<PrismicImage field={slice.primary.image_2} />
						<p class="absolute bottom-0 right-0 px-8 py-3 mx-8 mb-8 text-xs md:text-lg text-primary label">
							{slice.primary.label_2}
						</p>
			</PrismicLink>
		</div>
		<div class="basis-1/3">
			<div class="text-2xl font-medium md:text-4xl ">
				<PrismicRichText field={slice.primary.title} />
			</div>
			<div class="text-xs md:text-lg md:mt-8">
				<PrismicRichText field={slice.primary.text} />
			</div>
		</div>
	</div>
</section>

<style>
	section :global(img) {
		object-fit: cover;
		aspect-ratio: 4/3;
	}
	
	section :global(.label) {
		background-color: white !important;
	}

	section :global(p) {
		line-height: 1;
	}
</style>