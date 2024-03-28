<script>

	import { PrismicRichText, PrismicLink } from "@prismicio/svelte";
	import { onMount } from 'svelte';
	
	let activeIndex= 0;

	const nextSlide = () => { activeIndex = (activeIndex + 1) % slice.items.length; };
	const previousSlide = () => { activeIndex = (activeIndex - 1 + slice.items.length) % slice.items.length; };
	const goToSlide = (index) => { activeIndex = index; };
	
	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
	
	const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
        previousSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
};

	/** @type {import("@prismicio/client").Content.BannerReviewSlice} */
	export let slice;
	
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="pb-12 text-center bg-secondary">
		<div class="px-24 pt-8 text-2xl underline decoration-1 underline-offset-8 md:text-4xl md:px-0">
			<PrismicRichText field={slice.primary.title} />
		</div>
		<div class='pt-20'>
			{#each slice.items as item, index}
			<div class={index === activeIndex ? '' : 'hidden'}>
				<div class="uppercase">
					<PrismicRichText field={item.subtitle} />
				</div>
				<div class="flex items-center pt-4 min-h-36 md:px-[15%]">
					<button on:click={previousSlide}>
						<img src="/chevron-gauche.svg" alt="Précédent" class="w-6 h-6" />
					</button>
					<div class="mx-24"><PrismicRichText field={item.text} /></div>
					<button on:click={nextSlide}>
						<img src="/chevron-droit.svg" alt="Suivant" class="w-6 h-6" />
					</button>
				</div>
			</div>
			{/each }
		</div>
		<div class="flex justify-center mt-4">
			{#each slice.items as item, index}
			<button
				class={`w-3 h-3 rounded-full mx-1
					${index === activeIndex ? 'bg-primary' : 'border-primary border'}`}
				on:click={() => goToSlide(index)} aria-label={`Slide ${index + 1}`}></button>
			{/each}
		</div>
		<div class="mt-8 text-base font-light text-center text-primary">
			<PrismicLink field={slice.primary.link} class="px-6 pt-1 pb-2 border">{slice.primary.label}</PrismicLink>
		</div>
</section>