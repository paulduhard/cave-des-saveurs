<script>
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';

	export let data;

	let filterData = {
		colors: [],
		selectedColors: [],
		regions: [],
		selectedRegions: []
	};

	let filteredWines = [];

	function getWineUrl(wine) {
		return `/vin/${wine.uid}`;
	}

	// let colors = [];
	// let selectedColors = [];
	// let filteredWines = [];

	const client = createClient(repositoryName);

	onMount(async () => {
		try {
			const colorResponse = await client.getAllByType('couleur');
			filterData.colors = colorResponse.map((color) => ({
				uid: color.uid,
				name: color.data.couleur
			}));
			console.log('Colors fetched:', filterData.colors);

			// Optionally fetch regions here
			// const regionResponse = await client.getAllByType('region');
			// filterData.regions = regionResponse.map((region) => ({
			//     uid: region.uid,
			//     name: region.data.region
			// }));

			applyFilters();
		} catch (error) {
			console.error('Error fetching filters:', error);
			// Initialize with empty arrays if fetch fails
			filterData.colors = [];
			filterData.regions = [];
		}
	});

	function handleFilterChange(filterType, value) {
		switch (filterType) {
			case 'color':
				if (filterData.selectedColors.includes(value)) {
					filterData.selectedColors = filterData.selectedColors.filter((c) => c !== value);
				} else {
					filterData.selectedColors = [...filterData.selectedColors, value];
				}
				break;
			case 'region':
				if (filterData.selectedRegions.includes(value)) {
					filterData.selectedRegions = filterData.selectedRegions.filter((r) => r !== value);
				} else {
					filterData.selectedRegions = [...filterData.selectedRegions, value];
				}
				break;
		}
		applyFilters();
	}

	function applyFilters() {
		filteredWines = data.wines.filter((wine) => {
			const colorMatch =
				filterData.selectedColors.length === 0 ||
				filterData.selectedColors.includes(wine.data.couleur.uid);
			const regionMatch =
				filterData.selectedRegions.length === 0 ||
				filterData.selectedRegions.includes(wine.data.region.uid);
			return colorMatch && regionMatch;
		});
	}

	$: {
		applyFilters();
	}
</script>

<div class="flex">
	<Aside bind:filterData {handleFilterChange} />

	<main class="w-4/5 p-4">
		{#if data.region}
			<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
			<PrismicRichText field={data.region.description} />
		{:else}
			<p>No region data available.</p>
		{/if}

		<div class="my-24 mr-12">
			{#if filteredWines && filteredWines.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredWines as wine}
						<div transition:fade={{ duration: 600 }}>
							<a
								href={getWineUrl(wine)}
								class="flex flex-col items-start justify-center p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
							>
								<PrismicImage field={wine.data.image} class="self-center" />
								<span class="font-span text-xl">{wine.fullDomainData.domaine}</span>
								<PrismicRichText field={wine.data.title} />
								<PrismicRichText field={wine.data.resume} />
								<button
									class="mt-4 inline-block border px-8 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
								>
									Découvrir
								</button>
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<p transition:fade={{ duration: 300 }}>Aucun vin trouvé pour cette couleur.</p>
			{/if}
		</div>
	</main>
</div>
