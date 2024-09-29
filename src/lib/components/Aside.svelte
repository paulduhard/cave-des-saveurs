<script>
	export let filterData;
	export let handleFilterChange;
</script>

<aside class="bg-gray-100 w-1/5 p-4">
	<h2 class="mb-4 text-2xl font-bold">Filtres</h2>

	<div class="mb-6">
		<h3 class="mb-2 text-xl uppercase">Couleurs</h3>
		{#each filterData.colors as color}
			<label class="mb-2 flex items-center">
				<input
					type="checkbox"
					value={color.uid}
					checked={filterData.selectedColors.includes(color.uid)}
					on:change={() => handleFilterChange('color', color.uid)}
					class="mr-2"
				/>
				{color.name}
			</label>
		{/each}
	</div>

	<div class="mb-6">
		<h3 class="mb-2 text-xl font-semibold">Régions</h3>
		{#each filterData.regions as region}
			<label class="mb-2 flex items-center">
				<input
					type="checkbox"
					value={region.uid}
					checked={filterData.selectedRegions.includes(region.uid)}
					on:change={() => handleFilterChange('region', region.uid)}
					class="mr-2"
				/>
				{region.name}
			</label>
		{/each}
	</div>
</aside>
