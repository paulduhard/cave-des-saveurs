<script>
	import { PrismicRichText } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';
	import VinCard from '$lib/components/vin/VinCard.svelte';
	import { goto } from '$app/navigation';
	import { vinFilters } from '$lib/stores/vinFilters';

	export let data;

	let appellationNames = {};

	function getWineUrl(wine) {
		return `/vin/${wine.uid}`;
	}

	function goToHome() {
		goto('/');
	}

	const client = createClient(repositoryName);

	onMount(async () => {
		try {
			const colorResponse = await client.getAllByType('couleur');
			const colors = colorResponse.map((color) => ({
				uid: color.uid,
				name: color.data.couleur
			}));

			const domainResponse = await client.getAllByType('domaine');
			const domains = domainResponse.map((domain) => ({
				uid: domain.uid,
				name: domain.data.domaine || 'Unknown Domain'
			}));

			const appellationResponse = await client.getAllByType('appellation');
			const appellations = appellationResponse.map((appellation) => ({
				uid: appellation.uid,
				name: appellation.data.nom,
				domainUids: [] // Nous allons remplir cela avec les domaines associés
			}));
			data.wines.forEach((wine) => {
				if (wine.data.appellation && wine.data.appellation.uid) {
					const appellation = appellations.find((a) => a.uid === wine.data.appellation.uid);
					if (appellation && !appellation.domainUids.includes(wine.data.domaine.uid)) {
						appellation.domainUids.push(wine.data.domaine.uid);
					}
				}
			});

			const selectedRegion = data.region.uid; // Obtenez l'UID de la région sélectionnée

			vinFilters.setInitialData({
				colors,
				domains,
				appellations,
				regions: [data.region], // Ajoutez la région actuelle
				wines: data.wines,
				selectedRegion // Passez la région sélectionnée
			});

			// Appliquez les filtres immédiatement pour ne montrer que les vins de la région sélectionnée
			vinFilters.applyFilters(data.wines);
		} catch (error) {
			console.error('Error in onMount:', error);
		}
	});

	function handleFilterChange(filterType, value) {
		vinFilters.updateFilter(filterType, value);
		vinFilters.applyFilters(data.wines);
	}

	$: filteredWines = $vinFilters.filteredWines;
</script>

<div class="container mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
		<button
			class="mr-12 h-12 border border-primary px-20 font-light text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<div class="mx-12 flex">
		<Aside filterData={$vinFilters} {handleFilterChange} {appellationNames} />

		<main class="mx-6 w-3/4">
			<PrismicRichText field={data.region.description} />
			<div class="my-24 mr-12">
				{#if filteredWines && filteredWines.length > 0}
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each filteredWines as wine (wine.uid)}
							<VinCard {wine} {getWineUrl} />
						{/each}
					</div>
				{:else}
					<p class="text-center">Aucun vin trouvé pour cette sélection.</p>
				{/if}
			</div>
		</main>
	</div>
</div>
