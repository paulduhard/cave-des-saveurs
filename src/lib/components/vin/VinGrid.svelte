<script>
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import { fade } from 'svelte/transition';
	// import { vinFilters } from '$lib/stores/vinFilters'; // Importation du store vinFilters
	// import { derived } from 'svelte/store'; // Importation de derived

	export let wines;
	export let getWineUrl;

	// Création d'un store dérivé pour filtrer les vins en fonction des filtres sélectionnés
	// const filteredWines = derived(vinFilters, ($vinFilters) => {
	// 	return $vinFilters.filteredWines;
	// });
</script>

<div class="vin-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
	<!-- {#each $filteredWines as wine} -->
	{#each wines as wine}
		{#if wine}
			<div transition:fade={{ duration: 600 }} class="group flex h-full flex-col font-light">
				<a
					href={getWineUrl(wine)}
					class="flex flex-grow flex-col items-start p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
				>
					<PrismicImage field={wine.data.image} class="self-center" />
					<span class="mt-8 font-span text-xl">{wine.fullDomainData?.domaine || ''}</span>
					<span class="mb-2 font-span"><PrismicRichText field={wine.data.title} /></span>
					<PrismicRichText field={wine.data.resume} />

					<div class="mt-auto pt-4">
						<button
							class="inline-block border px-8 py-2 font-light text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary"
						>
							Découvrir
						</button>
					</div>
				</a>
			</div>
		{/if}
	{/each}
</div>
