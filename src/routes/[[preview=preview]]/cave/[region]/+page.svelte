<script>
	import { SliceZone } from '@prismicio/svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	import Aside from '$lib/components/Aside.svelte';
	import { components } from '$lib/slices';
	import VinGrid from '$lib/components/vin/VinGrid.svelte';
	import { vinFilters } from '$lib/stores/vinFilters';
	import { get } from 'svelte/store';

	export let data;

	function getWineUrl(wine) {
		return `/cave/${wine.data.region.uid}/vin/${wine.uid}`;
	}

	// Initialiser les données dans le store vinFilters
	vinFilters.setInitialData({
		colors: data.colors,
		domains: data.domains,
		appellations: data.appellationsByDomain.flatMap((d) => d.appellations),
		regions: [],
		wines: data.wines,
		selectedRegion: data.region.uid
	});

	// Ajoutez des logs pour vérifier les données
	console.log('colors:', data.colors);

	// Obtenez les vins filtrés
	let filteredWines = [];
	vinFilters.subscribe((value) => {
		filteredWines = value.filteredWines;
	});
</script>

<SliceZone slices={data.page.data.slices} {components} />

<div class="container mx-auto mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
		<a
			href="/"
			class="mr-12 flex h-12 items-center justify-center border border-primary px-20 font-light text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
			>Alcools et spiritueux</a
		>
	</header>

	<div class="mx-12 flex">
		<Aside domains={data.domains} appellationsByDomain={data.appellationsByDomain} />

		<main class="mx-6 w-3/4">
			<PrismicRichText field={data.region.description} />
			<div class="my-24 mr-12">
				{#if filteredWines && filteredWines.length > 0}
					<VinGrid wines={filteredWines} {getWineUrl} />
				{:else}
					<p>Aucun vin trouvé pour cette région.</p>
				{/if}
			</div>
		</main>
	</div>
</div>
