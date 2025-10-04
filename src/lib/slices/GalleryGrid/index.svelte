<script>
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	/** @type {import("@prismicio/client").Content.GalleryGridSlice} */
	export let slice;

	/**
	 * Détermine les classes 'col-span' et 'aspect-ratio' spécifiques au mobile (par défaut).
	 * Logique:
	 *   - Images à l'index 0, 3, 6... (chaque 3ème image) seront sur une seule colonne (col-span-2).
	 *   - Les autres images (1, 2, 4, 5...) seront en paire (col-span-1) avec un aspect carré (aspect-square) pour une hauteur uniforme.
	 * @param {number} index
	 * @returns {string} Classes Tailwind CSS pour le col-span et l'aspect-ratio sur mobile.
	 */
	function getMobileColClasses(index) {
		if (index % 3 === 0) {
			// Première image d'un cycle de 3: prend toute la largeur des 2 colonnes
			return 'col-span-2';
		} else {
			// Les deux images suivantes dans le cycle: prennent 1 colonne et ont un aspect carré
			return 'col-span-1 aspect-square';
		}
	}

	/**
	 * Détermine les classes 'col-span' et 'aspect' spécifiques au desktop (md: et plus).
	 * Cette fonction reproduit l'exact comportement original du layout desktop,
	 * en s'assurant que les classes 'md:' prennent la priorité sur les classes mobiles.
	 * @param {number} index
	 * @returns {string} Classes Tailwind CSS pour le col-span et l'aspect-ratio sur desktop.
	 */
	function getDesktopColClasses(index) {
		let classes = '';

		// Ces conditions `md:` écrasent les classes mobiles pour les écrans plus grands.
		// C'est la logique EXACTE qui était définie par les classes `md:` dans votre code original.
		if (index % 5 === 3 || index % 5 === 4) {
			classes += 'md:col-span-3 md:aspect-[290/190] md:h-auto';
		} else {
			classes += 'md:col-span-2 md:aspect-[95/90] md:h-auto';
		}
		return classes;
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container mx-auto py-12"
	role="region"
	aria-labelledby="gallery-heading"
>
	<h2 id="gallery-heading" class="sr-only">
		Galerie d'images {slice.primary.caption_text ? `- ${slice.primary.caption_text}` : ''}
	</h2>

	<!--
		Pour mobile (par défaut), la grille est en 2 colonnes (grid-cols-2).
		Pour desktop (md:), elle repasse en 6 colonnes (md:grid-cols-6), écrasant le grid-cols-2.
	-->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-6" role="img" aria-labelledby="gallery-heading">
		{#if slice.primary.images && slice.primary.images.length > 0}
			{#each slice.primary.images as imageItem, index}
				<PrismicImage
					field={imageItem.image}
					class={`w-full object-cover ${getMobileColClasses(index)} ${getDesktopColClasses(index)}`}
					alt={imageItem.image.alt || `Image de galerie ${index + 1}`}
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
