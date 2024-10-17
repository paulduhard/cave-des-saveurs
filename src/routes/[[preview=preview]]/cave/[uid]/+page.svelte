<script>
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';
	import { goto } from '$app/navigation';

	function goToHome() {
		goto('/'); // Navigates to the home page
	}

	export let data;

	let appellationNames = {};

	let filterData = {
		colors: [],
		selectedColor: null,
		domains: [],
		selectedDomain: null,
		appellations: [],
		displayedAppellations: [],
		selectedAppellation: null
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
				appellationNames[appellation.uid] = appellation.data.appellation;
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

			// Set the first domain as selected by default
			if (filterData.domains.length > 0) {
				filterData.selectedDomain = filterData.domains[0].uid;
				updateDisplayedAppellations();
			}

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
			if (filterData.selectedDomain === value) {
				// If the same domain is clicked again, reset the appellation
				filterData.selectedAppellation = null;
			} else {
				filterData.selectedDomain = value;
				filterData.selectedAppellation = null; // Reset appellation when domain changes
			}
			updateDisplayedAppellations();
		} else if (filterType === 'appellation') {
			filterData.selectedAppellation = value === filterData.selectedAppellation ? null : value;
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
			const appellationMatch =
				!filterData.selectedAppellation ||
				wine.data.appellation.uid === filterData.selectedAppellation;
			return colorMatch && domainMatch && appellationMatch;
		});
	}

	function getWinesByAppellation(appellationUid) {
		return data.wines.filter(
			(wine) =>
				wine.data.appellation.uid === appellationUid &&
				wine.data.domaine.uid === filterData.selectedDomain
		);
	}

	$: {
		applyFilters();
	}
</script>

<div class="container mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
		<button
			class="mr-12 h-12 border border-primary px-20 font-light text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<div class=" mx-12 flex">
		<Aside bind:filterData {handleFilterChange} {appellationNames} {getWinesByAppellation} />

		<main class="mx-6 w-3/4">
			<PrismicRichText field={data.region.description} />
			<div class="my-24 mr-12">
				{#if filteredWines && filteredWines.length > 0}
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredWines as wine}
							<div
								transition:fade={{ duration: 600 }}
								class="group flex h-full flex-col font-light"
							>
								<a
									href={getWineUrl(wine)}
									class="flex flex-grow flex-col items-start p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
								>
									<PrismicImage field={wine.data.image} class="self-center" />
									<span class="mt-8 font-span text-xl">{wine.fullDomainData.domaine}</span>
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
						{/each}
					</div>
				{:else}
					<p class="top-1/2 w-full text-center" transition:fade={{ duration: 300 }}>
						Aucun vin trouvé pour cette couleur.
					</p>
				{/if}
			</div>
		</main>
	</div>
</div>
