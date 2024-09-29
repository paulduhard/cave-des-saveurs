<script>
	export let filterData = { colors: [], selectedColors: [], domains: [], selectedDomains: null };
	export let handleFilterChange;
</script>

<aside class="bg-gray-100 w-1/5 p-4">
	<div class="mb-6">
		<h3 class="mb-2 text-xl uppercase">Nos vins par domaines</h3>
		{#if filterData.domains && filterData.domains.length > 0}
			{#each filterData.domains as domain}
				<label class="mb-2 flex items-center">
					<input
						type="radio"
						name="domain"
						value={domain.uid}
						checked={filterData.selectedDomain === domain.uid}
						on:change={() => handleFilterChange('domain', domain.uid)}
						class="mr-2"
					/>
					{domain.name}
				</label>
			{/each}
		{:else}
			<p>Aucun domaine disponible</p>
		{/if}
	</div>

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
</aside>
