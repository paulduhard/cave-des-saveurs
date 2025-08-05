<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.BannerSocialSlice} */
	export let slice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="py-24 text-center"
>
	<div class="px-24 text-2xl md:px-0 md:text-4xl">
		<PrismicRichText field={slice.primary.text} />
	</div>
	<div class="flex items-baseline justify-center gap-12 pt-8">
		{#each slice.items as item}
			<PrismicLink
				field={item.link}
				class="transition-transform duration-300 ease-in-out hover:translate-y-1 hover:scale-95"
				><PrismicImage field={item.icon} /></PrismicLink
			>
		{/each}
	</div>
</section>
