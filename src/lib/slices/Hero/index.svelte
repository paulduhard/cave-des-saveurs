<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.HeroSlice} */
	export let slice;
</script>

{#if slice.variation === 'default'}
	<section
		data-slice-type={slice.slice_type}
		data-slice-variation={slice.variation}
		class="mb-28 text-center md:p-8"
	>
		<div
			class="relative h-[340px] md:aspect-auto md:h-[400px]
"
		>
			<PrismicImage
				field={slice.primary.image}
				class="absolute inset-0 h-full w-full object-cover"
				alt={slice.primary.image.alt || "Image d'en-tête"}
			/>
		</div>
		<h1 class="m-auto mt-8 max-w-52 text-2xl md:max-w-max md:text-4xl">
			<PrismicRichText field={slice.primary.title} />
		</h1>
		<div class="text-md mx-6 mt-4 md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">
			<PrismicRichText field={slice.primary.text} />
		</div>
		<div class="mt-12 text-center text-base font-light text-primary">
			<PrismicLink
				field={slice.primary.link}
				class="transition duration-300 ease-in-out hover:bg-primary hover:text-secondary"
				>{slice.primary.label}</PrismicLink
			>
		</div>
	</section>
{:else if slice.variation === 'heroTextOnly'}
	<section
		data-slice-type={slice.slice_type}
		data-slice-variation={slice.variation}
		class="bg-secondary pb-8 text-center"
	>
		<h1 class="pt-8 font-span text-2xl font-semibold md:text-4xl">
			<PrismicRichText field={slice.primary.title} />
		</h1>
		<div class="text-md mx-8 mt-4 text-justify indent-8 md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">
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
		border: 0.5px solid;
		padding: 0.4rem 1.5rem 0.6rem 1.5rem;
	}
</style>
