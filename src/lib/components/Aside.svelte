<script>
	import ColorFilter from './filters/vins/ColorFilter.svelte';
	import DomainFilter from './filters/vins/DomainFilter.svelte';
	import AppellationFilter from './filters/vins/AppellationFilter.svelte';
	import PriceFilter from './filters/vins/PriceFilter.svelte';
	import { vinFilters } from '$lib/stores/vinFilters';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let domains = [];
	export let appellationsByDomain = [];

	let filterData = {};

	const handleFilterChange = (event) => {
		const { type, value } = event.detail;
		vinFilters.updateFilter(type, value);
		vinFilters.applyFilters(); // Applique les filtres
	};

	onMount(() => {
		filterData = get(vinFilters);
	});
</script>

<aside class="w-1/4">
	<DomainFilter
		domainAppellations={appellationsByDomain}
		selectedDomain={filterData.selectedDomain}
		selectedAppellation={filterData.selectedAppellation}
		on:filterChange={handleFilterChange}
	/>

	{#if filterData.selectedDomain}
		<AppellationFilter
			appellations={appellationsByDomain.find(
				(domain) => domain.domain === filterData.selectedDomain
			)?.appellations || []}
			selectedAppellation={filterData.selectedAppellation}
			on:filterChange={handleFilterChange}
		/>
	{/if}

	<PriceFilter
		minPrice={filterData.minPrice}
		maxPrice={filterData.maxPrice}
		on:filterChange={handleFilterChange}
	/>

	<ColorFilter
		colors={filterData.colors}
		selectedColor={filterData.selectedColor}
		on:filterChange={handleFilterChange}
	/>
</aside>
