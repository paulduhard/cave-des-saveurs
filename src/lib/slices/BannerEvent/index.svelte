<script>
	import { PrismicRichText, PrismicLink } from "@prismicio/svelte";


	/** @type {import("@prismicio/client").Content.BannerEventSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="flex flex-col justify-center gap-4 text-center py-7 md:gap-6 md:flex-row md:items-center bg-primary md:py-4">
	<div class="font-light md:text-xl">
		<PrismicRichText field={slice.primary.text} />
	</div>
		<div class="text-sm font-light tracking-wider">
			<PrismicLink field={slice.primary.link}>{slice.primary.label}</PrismicLink>
		</div>
	</section>
	
<style>

	section :global(p), 
	section :global(a) 
	{
		color: white;
	}
	section :global(a) {
		border: .5px solid white;
		padding: .3rem 2.5rem;
	}

	@media (min-width: 1280px) {
		section :global(a) {
			padding: .3rem 3rem;
		}
	}
</style>