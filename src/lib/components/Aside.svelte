<script>
	import ColorFilter from './filters/vins/ColorFilter.svelte';
</script>

<!-- import DomainFilter from './filters/vins/DomainFilter.svelte';
	import AppellationFilter from './filters/vins/AppellationFilter.svelte';
	import PriceFilter from './filters/vins/PriceFilter.svelte';

	export let filterData;
	export let handleFilterChange;
	export let appellationNames;

	function onFilterChange(event) {
		const { type, value } = event.detail;
		handleFilterChange(type, value);
	} -->

<aside class="w-1/4">
	<!-- <DomainFilter
		domains={filterData.domains}
		selectedDomain={filterData.selectedDomain}
		appellations={filterData.appellations}
		selectedAppellation={filterData.selectedAppellation}
		{appellationNames}
		selectedRegion={filterData.selectedRegion}
		on:filterChange={onFilterChange}
	/> -->

	<!-- <AppellationFilter
		appellations={filterData.appellations}
		selectedAppellation={filterData.selectedAppellation}
		domains={filterData.domains}
		{appellationNames}
		selectedRegion={filterData.selectedRegion}
		on:filterChange={onFilterChange}
	/> -->

	<!-- <PriceFilter
		minPrice={filterData.minPrice}
		maxPrice={filterData.maxPrice}
		on:filterChange={onFilterChange}
	/> -->

	<ColorFilter />
	<!-- <ColorFilter
		colors={filterData.colors}
		selectedColor={filterData.selectedColor}
		on:filterChange={onFilterChange}
	/> -->
</aside>

<!--
	import { repositoryName } from '$lib/prismicio';
	import { fade } from 'svelte/transition';
	import { vinFilters } from '$lib/stores/vinFilters';

	export let data;

	let appellationNames = {};

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
	-->
<!--
		<Aside filterData={$vinFilters} {handleFilterChange} {appellationNames} /> -->
