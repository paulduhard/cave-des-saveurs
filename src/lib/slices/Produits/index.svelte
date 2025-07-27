<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';
	/** @type {import("@prismicio/client").Content.ProduitsSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div
		class="mx-8 mb-24 mt-8 flex flex-col items-center gap-6 text-left font-light text-primary md:mx-0 md:mr-12 md:flex-row"
	>
		<div class="basis-1/3">
			<PrismicLink field={slice.primary.link}>
				<div class="relative">
					<PrismicImage field={slice.primary.image} class="h-44 md:h-auto" />
					<p class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xl text-primary">
						{slice.primary.label}
					</p>
				</div></PrismicLink
			>
		</div>
		<div class="basis-1/3">
			<PrismicLink field={slice.primary.link_2}>
				<div class="relative">
					<PrismicImage field={slice.primary.image_2} class="h-44 md:h-auto" />
					<p
						class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg"
					>
						{slice.primary.label_2}
					</p>
				</div></PrismicLink
			>
		</div>
		<div class="basis-1/3">
			<div class="text-center text-2xl font-medium md:text-left md:text-4xl">
				<PrismicRichText field={slice.primary.title} />
			</div>
			<div class="mt-3 text-xs md:mt-8 md:text-lg">
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
