<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.HeroSlice} */
	export let slice;
</script>

{#if slice.variation === 'default'}
	<section
		data-slice-type={slice.slice_type}
		data-slice-variation={slice.variation}
		class="mb-28 p-8 text-center"
	>
		<div class="relative h-[200px] md:h-[400px]">
			<PrismicImage
				field={slice.primary.image}
				class="absolute inset-0 h-full w-full object-cover"
			/>
		</div>
		<div class="mt-8 text-2xl md:text-4xl">
			<PrismicRichText field={slice.primary.title} />
		</div>
		<div class="mx-8 mt-4 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">
			<PrismicRichText field={slice.primary.text} />
		</div>
		<div class="mt-8 text-center text-base font-light text-primary">
			<PrismicLink field={slice.primary.link} class=" hover:bg-primary hover:text-secondary"
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
		<div class="pt-8 text-2xl md:text-4xl">
			<PrismicRichText field={slice.primary.title} />
		</div>
		<div class="mx-8 mt-4 text-xs md:mt-8 md:px-[12%] md:text-lg lg:px-[25%]">
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
