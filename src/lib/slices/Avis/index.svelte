<script>
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { isExternalLink } from '../../functions.js';
	import { fade } from 'svelte/transition';

	let activeIndex = 0;

	const nextSlide = () => {
		activeIndex = (activeIndex + 1) % slice.items.length;
	};
	const previousSlide = () => {
		activeIndex = (activeIndex - 1 + slice.items.length) % slice.items.length;
	};
	const goToSlide = (index) => {
		activeIndex = index;
	};

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
	class="bg-secondary pb-12 text-center"
>
	<div class="pt-8 text-2xl underline decoration-1 underline-offset-8 md:px-0 md:text-4xl lg:px-24">
		<PrismicRichText field={slice.primary.title} />
	</div>
	<div class="pt-8 md:pt-20">
		{#each slice.items as item, index}
			<div class={index === activeIndex ? '' : 'hidden'}>
				<div class="uppercase">
					<PrismicRichText field={item.subtitle} />
				</div>
				<div class="flex min-h-36 items-center px-4 pt-4 md:px-[15%]">
					<button on:click={previousSlide}>
						<img src="/assets/chevron-gauche.svg" alt="Précédent" class="h-24 w-24 md:h-6 md:w-6" />
					</button>
					<div class="mx-8 text-sm md:mx-24 md:text-base">
						<PrismicRichText field={item.text} />
					</div>
					<button on:click={nextSlide}>
						<img src="/assets/chevron-droit.svg" alt="Suivant" class="h-24 w-24 md:h-6 md:w-6" />
					</button>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-4 flex justify-center">
		{#each slice.items as item, index}
			<button
				class={`mx-1 h-3 w-3 rounded-full ${index === activeIndex ? 'bg-primary' : 'border border-primary'}`}
				on:click={() => goToSlide(index)}
				aria-label={`Aller à la diapositive ${index + 1}`}
			></button>
		{/each}
	</div>
	<div class="mt-8 text-center text-base font-light text-primary">
		{#if isExternalLink(slice.primary.link.url)}
			<PrismicLink field={slice.primary.link} class="border px-6 pb-2 pt-1">
				{slice.primary.label}
				<img
					src="/assets/icone-external-link-primary.svg"
					alt="lien externe"
					class="mb-1 ml-2 inline h-4 w-4"
				/>
			</PrismicLink>
		{:else}
			<PrismicLink field={slice.primary.link} class="border px-6 pb-2 pt-1">
				{slice.primary.label}
			</PrismicLink>
		{/if}
	</div>
</section>
