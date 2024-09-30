<script>
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';

	export let data;

	let appellationNames = {};

	let filterData = {
		colors: [],
		selectedColor: null,
		domains: [],
		selectedDomain: null,
		appellations: [],
		displayedAppellations: []
	};

	let filteredWines = [];

	function getWineUrl(wine) {
		return `/vin/${wine.uid}`;
	}

	const client = createClient(repositoryName);

	onMount(async () => {
		try {
			const colorResponse = await client.getAllByType('couleur');
			filterData.colors = colorResponse.map((color) => ({
				uid: color.uid,
				name: color.data.couleur
			}));

			const domainResponse = await client.getAllByType('domaine');
			filterData.domains = domainResponse.map((domain) => ({
				uid: domain.uid,
				name: domain.data.domaine || 'Unknown Domain' // Provide a fallback value
			}));

			const appellationResponse = await client.getAllByType('appellation');
			appellationResponse.forEach((appellation) => {
				appellationNames[appellation.uid] = appellation.data.nom; // Assuming 'nom' is the field for the appellation name
			});

			// Extract appellations from wine data
			const appellations = new Set();
			data.wines.forEach((wine) => {
				if (wine.data.appellation && wine.data.appellation.uid) {
					appellations.add(
						JSON.stringify({
							uid: wine.data.appellation.uid,
							domainUid: wine.data.domaine.uid
						})
					);
				}
			});
			filterData.appellations = Array.from(appellations).map(JSON.parse);
			console.log('Extracted appellations:', filterData.appellations);
			console.log('Appellation names:', appellationNames);

			applyFilters();
		} catch (error) {
			console.error('Error in onMount:', error);
			// ... error handling ...
		}
	});

	function handleFilterChange(filterType, value) {
		if (filterType === 'color') {
			filterData.selectedColor = value === filterData.selectedColor ? null : value;
		} else if (filterType === 'domain') {
			filterData.selectedDomain = value === filterData.selectedDomain ? null : value;
			updateDisplayedAppellations();
		}
		applyFilters();
	}

	function updateDisplayedAppellations() {
		if (filterData.selectedDomain) {
			filterData.displayedAppellations = filterData.appellations.filter(
				(app) => app.domainUid === filterData.selectedDomain
			);
		} else {
			filterData.displayedAppellations = [];
		}
		console.log('Updated displayed appellations:', filterData.displayedAppellations);
		filterData = { ...filterData }; // Force Svelte to update
	}

	function applyFilters() {
		filteredWines = data.wines.filter((wine) => {
			const colorMatch =
				!filterData.selectedColor || wine.data.couleur.uid === filterData.selectedColor;
			const domainMatch =
				!filterData.selectedDomain || wine.data.domaine.uid === filterData.selectedDomain;
			return colorMatch && domainMatch;
		});
	}

	$: {
		applyFilters();
	}
</script>

<header class="mx-12">
	{#if data.region}
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
	{:else}
		<p>No region data available.</p>
	{/if}
</header>

<div class=" mx-12 flex">
	<Aside bind:filterData {handleFilterChange} {appellationNames} />

	<main class="w-3/4 px-6">
		{#if data.region}
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
