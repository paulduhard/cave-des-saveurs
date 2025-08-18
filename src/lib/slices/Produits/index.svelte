<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';
	/** @type {import("@prismicio/client").Content.ProduitsSlice} */
	export let slice;

	// Function to generate the URL for a Prismic Document Link
	function getDocumentUrl(link) {
		if (link && link.link_type === 'Document' && link.uid) {
			return `/cave/${link.uid}`;
		}
		return '#';
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="max-sm:container"
>
	<div
		class="mt-8 flex flex-col items-center gap-6 text-center font-light md:mx-0 md:mb-32 md:mr-12 md:flex-row md:text-left"
	>
		<div class="flex-1">
			<a href={getDocumentUrl(slice.primary.link_2)}>
				<div class="relative">
					<PrismicImage field={slice.primary.image_2} class="h-44 md:h-auto" />
					<p
						class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg"
					>
						{slice.primary.label_2}
					</p>
				</div>
			</a>
		</div>
		<div class="flex-1">
			<PrismicLink field={slice.primary.link}>
				<div class="relative">
					<PrismicImage field={slice.primary.image} class="h-44 md:h-auto" />
					<p
						class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg"
					>
						{slice.primary.label}
					</p>
				</div></PrismicLink
			>
		</div>
		<div class="flex-1">
			<div class="w-full text-center text-2xl font-medium md:w-52 md:text-left md:text-4xl">
				<PrismicRichText field={slice.primary.title} />
			</div>
			<div class="text-md mt-3 md:mt-8 md:text-lg">
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
