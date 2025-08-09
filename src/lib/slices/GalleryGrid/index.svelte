<script>
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	/** @type {import("@prismicio/client").Content.GalleryGridSlice} */
	export let slice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container mx-auto px-4 py-12"
>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
		{#if slice.primary.images && slice.primary.images.length > 0}
			{#each slice.primary.images as imageItem, index}
				<PrismicImage field={imageItem.image} class="h-full w-full object-cover" />
			{/each}
		{/if}
	</div>

	{#if slice.primary.show_captions && isFilled.keyText(slice.primary.caption_text)}
		<div class="text-md mt-2 text-left font-light">
			<p>{slice.primary.caption_text}</p>
		</div>
	{/if}
</section>

<style>
	section :global(img) {
		object-fit: cover;
		aspect-ratio: 16/9;
	}

	@media (min-width: 768px) {
		section :global(img) {
			aspect-ratio: 4/3;
		}
	}
</style>
