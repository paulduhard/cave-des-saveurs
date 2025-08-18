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
	class="sm:max-md:container"
>
	<div
		class="mt-8 flex flex-col items-center gap-6 text-center font-light md:flex-row md:text-left lg:mx-0 lg:mb-32 lg:mr-12"
	>
		<div class="flex-1">
			<a href={getDocumentUrl(slice.primary.link_2)}>
				<div class="relative">
					<PrismicImage
						field={slice.primary.image_2}
						class="aspect-[4/3] h-44 object-cover md:h-auto"
					/>
					<p
						style="background-color: white; line-height: 1;"
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
					<PrismicImage
						field={slice.primary.image}
						class="aspect-[4/3] h-44 object-cover md:h-auto"
					/>
					<p
						style="background-color: white; line-height: 1;"
						class="label absolute bottom-0 right-0 mx-8 mb-8 px-8 py-3 text-xs text-primary md:text-lg"
					>
						{slice.primary.label}
					</p>
				</div></PrismicLink
			>
		</div>
		<div class="flex-1">
			<div class="w-full text-center text-2xl font-medium md:text-left md:text-4xl lg:w-52">
				<PrismicRichText field={slice.primary.title} />
			</div>
			<div class="text-md mt-3 md:text-lg lg:mt-8">
				<PrismicRichText field={slice.primary.text} />
			</div>
		</div>
	</div>
</section>
