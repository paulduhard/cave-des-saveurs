<script>
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	/** @type {import("@prismicio/client").Content.GalleryGridSlice} */
	export let slice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container mx-auto py-12"
>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-6">
		{#if slice.primary.images && slice.primary.images.length > 0}
			{#each slice.primary.images as imageItem, index}
				<PrismicImage
					field={imageItem.image}
					class={`w-full object-cover
						${index === 0 ? 'col-span-2' : ''}
						${index === 1 ? 'col-span-3' : ''}
						${
							index % 5 === 3 || index % 5 === 4
								? 'md:col-span-3 md:aspect-[290/190] md:h-auto'
								: 'md:col-span-2 md:aspect-[95/90] md:h-auto'
						}
					`}
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
