<script>
	import ColorFilter from './filters/vins/ColorFilter.svelte';
	import DomainFilter from './filters/vins/DomainFilter.svelte';
	import AppellationFilter from './filters/vins/AppellationFilter.svelte';
	import PriceFilter from './filters/vins/PriceFilter.svelte';
	import { vinFilters } from '$lib/stores/vinFilters';
	import { onMount } from 'svelte';

	let filterData = {};
	let appellationNames = {};

	const handleFilterChange = (event) => {
		const { type, value } = event.detail;
		vinFilters.updateFilter(type, value);
		vinFilters.applyFilters(filterData.wines);
	};

	onMount(() => {
		filterData = $vinFilters;
	});
</script>

<aside class="w-1/4">
	<DomainFilter
		domains={filterData.domains}
		selectedDomain={filterData.selectedDomain}
		appellations={filterData.appellations}
		selectedAppellation={filterData.selectedAppellation}
		{appellationNames}
		selectedRegion={filterData.selectedRegion}
		on:filterChange={handleFilterChange}
	/>

	{#if filterData.selectedDomain}
		<AppellationFilter
			appellations={filterData.appellations}
			selectedAppellation={filterData.selectedAppellation}
			domains={filterData.domains}
			{appellationNames}
			selectedRegion={filterData.selectedRegion}
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
