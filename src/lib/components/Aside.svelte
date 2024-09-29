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

	$: console.log('Displayed appellations in Aside:', filterData.displayedAppellations);
</script>

<aside class="bg-gray-100 w-1/5 p-4">
	<div class="mb-6">
		<h3 class="mb-2 text-xl uppercase">Nos vins par domaines</h3>
		{#if filterData.domains && filterData.domains.length > 0}
			{#each filterData.domains as domain}
				<label class="mb-2 block cursor-pointer">
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
			{/each}
		{:else}
			<p>Aucun domaine disponible</p>
		{/if}
	</div>

	{#if filterData.selectedDomain && filterData.displayedAppellations.length > 0}
		<div class="mb-6">
			<h4 class="mb-2 text-lg">Appellations:</h4>
			<ul class="list-disc pl-5">
				{#each filterData.displayedAppellations as appellation}
					<li>{appellationNames[appellation.uid] || 'Nom inconnu'}</li>
				{/each}
			</ul>
		</div>
	{:else if filterData.selectedDomain}
		<p>Aucune appellation trouvée pour ce domaine.</p>
	{/if}

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
