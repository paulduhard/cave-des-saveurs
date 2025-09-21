<script>
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { isExternalLink } from '../../functions.js';

	let activeIndex = 0;
	let autoplayInterval;
	let autoplayTimeout;
	const autoplayDelay = 3000;
	const autoplayResumeDelay = 5000;
	const transitionDuration = 500;

	let isTransitioning = false;

	// Variables pour le support tactile
	let touchStartX = 0;
	let touchEndX = 0;
	let isTouching = false;
	const swipeThreshold = 50;

	onMount(() => {
		startAutoplay();
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			clearInterval(autoplayInterval);
			clearTimeout(autoplayTimeout);
		};
	});

	const startAutoplay = () => {
		clearInterval(autoplayInterval);
		autoplayInterval = setInterval(() => {
			if (!isTransitioning) {
				const nextIndex = (activeIndex + 1) % slice.items.length;
				animateSlideChange(nextIndex);
			}
		}, autoplayDelay + transitionDuration);
	};

	const pauseAutoplay = () => {
		clearInterval(autoplayInterval);
	};

	const resumeAutoplay = () => {
		clearTimeout(autoplayTimeout);
		autoplayTimeout = setTimeout(startAutoplay, autoplayResumeDelay);
	};

	const animateSlideChange = async (newIndex) => {
		if (isTransitioning || newIndex === activeIndex) return;
		pauseAutoplay();
		isTransitioning = true;

		// attend la durée d'animation
		await new Promise((r) => setTimeout(r, transitionDuration));

		activeIndex = newIndex;

		// attend la fin du fade in
		await new Promise((r) => setTimeout(r, transitionDuration));

		isTransitioning = false;
		resumeAutoplay();
	};

	const nextSlideHandler = () => {
		const nextIndex = (activeIndex + 1) % slice.items.length;
		animateSlideChange(nextIndex);
	};

	const previousSlideHandler = () => {
		const prevIndex = (activeIndex - 1 + slice.items.length) % slice.items.length;
		animateSlideChange(prevIndex);
	};

	const goToSlideHandler = (index) => {
		animateSlideChange(index);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowLeft') {
			previousSlideHandler();
		} else if (event.key === 'ArrowRight') {
			nextSlideHandler();
		}
	};

	// Fonctions pour la gestion tactile
	const handleTouchStart = (event) => {
		if (isTransitioning) return;
		isTouching = true;
		touchStartX = event.touches[0].clientX;
		pauseAutoplay();
	};

	const handleTouchMove = (event) => {
		if (!isTouching || isTransitioning) return;
		touchEndX = event.touches[0].clientX;
	};

	const handleTouchEnd = (event) => {
		if (!isTouching || isTransitioning) return;
		isTouching = false;

		const swipeDistance = touchStartX - touchEndX;
		const absSwipeDistance = Math.abs(swipeDistance);

		if (absSwipeDistance > swipeThreshold) {
			if (swipeDistance > 0) {
				// Swipe vers la gauche → slide suivant
				nextSlideHandler();
			} else {
				// Swipe vers la droite → slide précédent
				previousSlideHandler();
			}
		} else {
			// Si le swipe n'est pas assez long, reprendre l'autoplay
			resumeAutoplay();
		}

		// Reset des valeurs
		touchStartX = 0;
		touchEndX = 0;
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
		<!-- Sous-titre -->
		<div class="relative h-8 uppercase md:h-10">
			{#each slice.items as item, index}
				<div
					class="absolute inset-0 flex items-center justify-center transition-opacity"
					style="
opacity: {index === activeIndex ? 1 : 0};
transition-duration: {transitionDuration}ms;
"
				>
					<PrismicRichText field={item.subtitle} />
				</div>
			{/each}
		</div>

		<!-- Texte principal -->
		<div
			class="flex min-h-36 items-center px-4 pt-4 md:px-[15%]"
			on:touchstart={handleTouchStart}
			on:touchmove={handleTouchMove}
			on:touchend={handleTouchEnd}
		>
			<button on:click={previousSlideHandler}>
				<img src="/assets/chevron-gauche.svg" alt="Précédent" class="md:h-6 md:w-6" />
			</button>

			<div class="relative mx-8 min-h-[90px] flex-1 text-sm md:mx-24 md:text-base">
				{#each slice.items as item, index}
					<div
						class="absolute inset-0 flex items-center justify-center transition-opacity"
						style="
opacity: {index === activeIndex ? 1 : 0};
transition-duration: {transitionDuration}ms;
"
					>
						<PrismicRichText field={item.text} />
					</div>
				{/each}
			</div>

			<button on:click={nextSlideHandler}>
				<img src="/assets/chevron-droit.svg" alt="Suivant" class="md:h-6 md:w-6" />
			</button>
		</div>
	</div>

	<!-- Pagination -->
	<div class="mt-12 flex justify-center">
		{#each slice.items as _, index}
			<button
				class={`mx-1 h-3 w-3 rounded-full ${
					index === activeIndex ? 'bg-primary' : 'border border-primary'
				}`}
				on:click={() => goToSlideHandler(index)}
				aria-label={`Aller à la diapositive ${index + 1}`}
			></button>
		{/each}
	</div>

	<!-- CTA -->
	<div class="mt-12 text-center text-base font-light text-primary md:mt-8">
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
