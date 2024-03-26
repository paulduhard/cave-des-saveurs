<script>
	import { PrismicRichText, PrismicLink } from "@prismicio/svelte";


	/** @type {import("@prismicio/client").Content.BannerEventSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="flex flex-col md:flex-row md:items-center	 gap-4 bg-[#3D0404] text-white justify-center text-center pt-4 md:py-8 pb-10">
		<PrismicRichText field={slice.primary.text} />
		<div>
			<PrismicLink field={slice.primary.link}>{slice.primary.label}</PrismicLink>
		</div>
	</section>
	
<style>
	section :global(p) {
		font-size: clamp(.95rem, 2vw, 1.5rem);
	}

section :global(a) {
		border: .5px solid white;
		padding: .4rem 2rem .6rem 2rem;
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 200;
	}

	@media (min-width: 1280px) {
		section :global(a) {
			padding: .4rem 4rem .6rem 4rem;

		}
	}
</style>