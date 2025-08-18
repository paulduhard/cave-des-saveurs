<script>
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	/** @type {import("@prismicio/client").Content.GalleryGridSlice} */
	export let slice;

	// Détermine la classe col-span pour les écrans mobiles (pas de préfixe md:)
	// Cycle: 1 image seule (col-span-2), puis 2 images (col-span-1 chacune)
	function getMobileColSpan(index) {
		return index % 3 === 0 ? 'col-span-2' : 'col-span-1';
	}

	// Détermine la classe col-span pour les écrans medium et plus grands (préfixe md:)
	function getMdColSpan(index) {
		if (index === 0) {
			return 'md:col-span-2 md:h-auto'; // Garde le comportement original pour index 0
		}
		if (index === 1) {
			return 'md:col-span-3 md:h-auto'; // Garde le comportement original pour index 1
		}
		if (index % 5 === 3 || index % 5 === 4) {
			return 'md:col-span-3 md:aspect-[290/190] md:h-auto';
		}
		return 'md:col-span-2 md:aspect-[95/90] md:h-auto';
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container mx-auto py-12"
>
	<!-- Changement ici: grid-cols-1 devient grid-cols-2 pour le mobile -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-6">
		{#if slice.primary.images && slice.primary.images.length > 0}
			{#each slice.primary.images as imageItem, index}
				<PrismicImage
					field={imageItem.image}
					class={`w-full object-cover ${getMobileColSpan(index)} ${getMdColSpan(index)}`}
				/>
			{/each}
		{/if}
	</div>

	{#if slice.primary.show_captions && isFilled.keyText(slice.primary.caption_text)}
		<div class="text-md mt-2 text-left font-light">
			<p>{slice.primary.caption_text}</p>
		</div>
	{/if}
</section>
