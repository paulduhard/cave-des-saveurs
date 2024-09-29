<script>
	export let filterData = {
		colors: [],
		selectedColor: null,
		domains: [],
		selectedDomain: null,
		appellations: [],
		displayedAppellations: []
	};
	export let handleFilterChange;
	export let appellationNames = {};
</script>

<aside class="bg-gray-100 w-1/5 p-4">
	<div class="mb-6">
		<h3 class="mb-2 text-xl uppercase">Nos vins par domaines</h3>
		{#if filterData.domains && filterData.domains.length > 0}
			{#each filterData.domains as domain}
				<div class="mb-2">
					<label class="block cursor-pointer">
						<input
							type="radio"
							name="domain"
							value={domain.uid}
							checked={filterData.selectedDomain === domain.uid}
							on:change={() => handleFilterChange('domain', domain.uid)}
							class="hidden"
						/>
						<span
							class="{filterData.selectedDomain === domain.uid
								? 'font-bold underline'
								: ''} hover:text-gray-700"
						>
							{domain.name}
						</span>
					</label>

					{#if filterData.selectedDomain === domain.uid && filterData.displayedAppellations.length > 0}
						<ul class="ml-4 mt-2 pl-2 text-sm">
							{#each filterData.displayedAppellations as appellation}
								<li>{appellationNames[appellation.uid] || 'Nom inconnu'}</li>
							{/each}
						</ul>
					{:else if filterData.selectedDomain === domain.uid}
						<p class="ml-4 mt-2 text-sm italic">Aucune appellation trouvée</p>
					{/if}
				</div>
			{/each}
		{:else}
			<p>Aucun domaine disponible</p>
		{/if}
	</div>

	<div class="mb-6">
		<h3 class="mb-2 text-xl uppercase">Couleurs</h3>
		{#each filterData.colors as color}
			<label class="mb-2 flex cursor-pointer items-center">
				<input
					type="checkbox"
					value={color.uid}
					checked={filterData.selectedColor === color.uid}
					on:change={() => handleFilterChange('color', color.uid)}
					class="mr-2"
				/>
				{color.name}
			</label>
		{/each}
	</div>
</aside>
