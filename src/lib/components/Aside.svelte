<script>
	import DomainFilter from './filters/vins/DomainFilter.svelte';
	import AppellationFilter from './filters/vins/AppellationFilter.svelte';
	import PriceFilter from './filters/vins/PriceFilter.svelte';
	import ColorFilter from './filters/vins/ColorFilter.svelte';

	export let filterData;
	export let handleFilterChange;
	export let appellationNames;

	function onFilterChange(event) {
		const { type, value } = event.detail;
		handleFilterChange(type, value);
	}
</script>

<aside class="bg-gray-100 w-1/4">
	<DomainFilter
		domains={filterData.domains}
		selectedDomain={filterData.selectedDomain}
		appellations={filterData.appellations}
		selectedAppellation={filterData.selectedAppellation}
		{appellationNames}
		selectedRegion={filterData.selectedRegion}
		on:filterChange={onFilterChange}
	/>

	<AppellationFilter
		appellations={filterData.appellations}
		selectedAppellation={filterData.selectedAppellation}
		domains={filterData.domains}
		{appellationNames}
		selectedRegion={filterData.selectedRegion}
		on:filterChange={onFilterChange}
	/>

	<PriceFilter
		minPrice={filterData.minPrice}
		maxPrice={filterData.maxPrice}
		on:filterChange={onFilterChange}
	/>

	<ColorFilter
		colors={filterData.colors}
		selectedColor={filterData.selectedColor}
		on:filterChange={onFilterChange}
	/>
</aside>
