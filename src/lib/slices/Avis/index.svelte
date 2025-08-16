<script>
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import { isExternalLink } from '../../functions.js';
	import { fade } from 'svelte/transition';

	let activeIndex = 0; // Cet index représente la slide actuellement affichée ou en cours d'apparition
	let autoplayInterval;
	let autoplayTimeout;
	const autoplayDelay = 3000; // 3 secondes
	const autoplayResumeDelay = 5000; // 5 secondes après interaction manuelle
	const transitionDuration = 500; // Durée de la transition fade (en ms)

	let isTransitioning = false; // Flag pour empêcher les transitions rapides
	let displayedItemText; // Contenu textuel de l'élément actuellement affiché ou en transition
	let displayedItemSubtitle; // Contenu du sous-titre de l'élément actuellement affiché ou en transition

	// Initialise le contenu affiché au premier élément lors du montage
	onMount(() => {
		displayedItemText = slice.items[activeIndex].text;
		displayedItemSubtitle = slice.items[activeIndex].subtitle;

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
		// Ajuste le délai d'autoplay pour inclure la durée des transitions fade out et fade in
		autoplayInterval = setInterval(
			() => {
				if (!isTransitioning) {
					const nextIndex = (activeIndex + 1) % slice.items.length;
					animateSlideChange(nextIndex);
				}
			},
			autoplayDelay + 2 * transitionDuration
		); // Attendre 2x la durée de transition pour la séquence fade out/in
	};

	const pauseAutoplay = () => {
		clearInterval(autoplayInterval);
	};

	const resumeAutoplay = () => {
		clearTimeout(autoplayTimeout);
		autoplayTimeout = setTimeout(startAutoplay, autoplayResumeDelay);
	};

	// Fonction asynchrone pour gérer la séquence fade out / fade in
	const animateSlideChange = async (newIndex) => {
		if (isTransitioning || newIndex === activeIndex) {
			return; // Empêche les changements si une transition est en cours ou si l'index est le même
		}
		pauseAutoplay();
		isTransitioning = true;

		// 1. Déclenche le fade out du contenu actuel
		displayedItemText = null;
		displayedItemSubtitle = null;

		// 2. Attend que le fade out soit terminé
		await new Promise((r) => setTimeout(r, transitionDuration));

		// 3. Met à jour l'index actif (important pour le {#key} block)
		activeIndex = newIndex;

		// 4. Déclenche le fade in du nouveau contenu
		displayedItemText = slice.items[newIndex].text;
		displayedItemSubtitle = slice.items[newIndex].subtitle;

		// 5. Attend que le fade in soit terminé
		await new Promise((r) => setTimeout(r, transitionDuration));

		isTransitioning = false;
		resumeAutoplay(); // Reprend l'autoplay une fois la transition complète
	};

	// Fonctions de navigation simplifiées appelant animateSlideChange
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
		<div class="uppercase">
			<!-- Appliquez la transition ici, en utilisant {#key} sur activeIndex pour forcer la recréation -->
			{#key activeIndex}
				<div transition:fade={{ duration: transitionDuration }}>
					{#if displayedItemSubtitle}
						<PrismicRichText field={displayedItemSubtitle} />
					{/if}
				</div>
			{/key}
		</div>
		<div class="flex min-h-36 items-center px-4 pt-4 md:px-[15%]">
			<button on:click={previousSlideHandler}>
				<img src="/assets/chevron-gauche.svg" alt="Précédent" class="h-24 w-24 md:h-6 md:w-6" />
			</button>
			<div class="mx-8 text-sm md:mx-24 md:text-base">
				<!-- Appliquez la transition ici, en utilisant {#key} sur activeIndex pour forcer la recréation -->
				{#key activeIndex}
					<div transition:fade={{ duration: transitionDuration }}>
						{#if displayedItemText}
							<PrismicRichText field={displayedItemText} />
						{/if}
					</div>
				{/key}
			</div>
			<button on:click={nextSlideHandler}>
				<img src="/assets/chevron-droit.svg" alt="Suivant" class="h-24 w-24 md:h-6 md:w-6" />
			</button>
		</div>
	</div>
	<div class="mt-4 flex justify-center">
		{#each slice.items as item, index}
			<button
				class={`mx-1 h-3 w-3 rounded-full ${index === activeIndex ? 'bg-primary' : 'border border-primary'}`}
				on:click={() => goToSlideHandler(index)}
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
