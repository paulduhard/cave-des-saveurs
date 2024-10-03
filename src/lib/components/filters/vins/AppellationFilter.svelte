<script>
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let appellations = [];
	export let selectedAppellation = null;
	export let domains = [];
	export let appellationNames = {};
	export let selectedRegion = null;

	let isAppellationSectionExpanded = true;

	const dispatch = createEventDispatcher();

	function toggleAppellationSection() {
		isAppellationSectionExpanded = !isAppellationSectionExpanded;
	}

	function handleAppellationChange(appellationUid) {
		if (selectedAppellation === appellationUid) {
			dispatch('filterChange', { type: 'selectedAppellation', value: null });
		} else {
			dispatch('filterChange', { type: 'selectedAppellation', value: appellationUid });
		}
	}

	$: filteredAppellations = appellations.filter(
		(appellation) => appellation.regionUid === selectedRegion
	);

	$: console.log('Filtered Appellations:', filteredAppellations);
</script>

<div class="mb-6 border-t border-primary">
	<button
		class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
		on:click={toggleAppellationSection}
		aria-expanded={isAppellationSectionExpanded}
		aria-controls="appellation-list"
	>
		NOS VINS PAR APPELLATIONS
		<ArrowIcon isSelected={isAppellationSectionExpanded} class="ml-2" />
	</button>

	<div id="appellation-list" class={isAppellationSectionExpanded ? '' : 'hidden'}>
		{#if filteredAppellations.length > 0}
			{#each filteredAppellations as appellation}
				<div class="mb-2">
					<label class="block cursor-pointer">
						<input
							type="radio"
							name="appellation"
							value={appellation.uid}
							checked={selectedAppellation === appellation.uid}
							on:change={() => handleAppellationChange(appellation.uid)}
							class="hidden"
						/>
						<div class="flex items-center justify-between font-light">
							<span
								class="{selectedAppellation === appellation.uid
									? 'font-bold underline'
									: ''} hover:text-gray-700"
							>
								{appellationNames[appellation.uid] || 'Nom inconnu'}
							</span>
							<ArrowIcon isSelected={selectedAppellation === appellation.uid} class="ml-2" />
						</div>
					</label>

					{#if selectedAppellation === appellation.uid}
						<ul class="ml-6 mt-2 pl-2 text-sm">
							{#each domains.filter((d) => appellation.domainUids.includes(d.uid)) as domain}
								<li>{domain.name}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		{:else}
			<p>Aucune appellation disponible pour cette région</p>
		{/if}
	</div>
</div>
