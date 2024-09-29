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
		domains: [],
		selectedDomain: null
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
			console.log('Colors fetched:', filterData.colors);

			const domainResponse = await client.getAllByType('domaine');
			filterData.domains = domainResponse.map((domain) => ({
				uid: domain.uid,
				name: domain.data.domaine || 'Unknown Domain' // Provide a fallback value
			}));
			console.log('Domains fetched:', filterData.domains);

			applyFilters();
		} catch (error) {
			console.error('Error fetching filters:', error);
			filterData.colors = [];
			filterData.domains = [];
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
			case 'domain':
				filterData.selectedDomain = value;
				break;
		}
		applyFilters();
	}

	function applyFilters() {
		filteredWines = data.wines.filter((wine) => {
			const colorMatch =
				filterData.selectedColors.length === 0 ||
				filterData.selectedColors.includes(wine.data.couleur.uid);
			const domainMatch =
				!filterData.selectedDomain ||
				(wine.data.domaine && wine.data.domaine.uid === filterData.selectedDomain);
			return colorMatch && domainMatch;
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
