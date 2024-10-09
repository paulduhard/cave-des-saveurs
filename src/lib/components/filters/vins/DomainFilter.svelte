<script>
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let domainAppellations = [];
	export let selectedDomain = null;
	export let selectedAppellation = null;

	let isDomainSectionExpanded = true;
	const dispatch = createEventDispatcher();

	function toggleDomainSection() {
		isDomainSectionExpanded = !isDomainSectionExpanded;
	}

	function handleDomainChange(domainUid) {
		dispatch('filterChange', { type: 'selectedDomain', value: domainUid });
	}

	function handleAppellationChange(appellationUid) {
		dispatch('filterChange', { type: 'selectedAppellation', value: appellationUid });
	}
</script>

<div class="mb-6 border-t border-primary">
	<button
		class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
		on:click={toggleDomainSection}
		aria-expanded={isDomainSectionExpanded}
		aria-controls="domain-list"
	>
		NOS VINS PAR DOMAINES
		<ArrowIcon isSelected={isDomainSectionExpanded} class="ml-2" />
	</button>

	<div id="domain-list" class={isDomainSectionExpanded ? '' : 'hidden'}>
		{#if domainAppellations && domainAppellations.length > 0}
			{#each domainAppellations as domain}
				<div class="mb-2">
					<label class="block cursor-pointer">
						<input
							type="radio"
							name="domain"
							value={domain.uid}
							checked={selectedDomain === domain.uid}
							on:change={() => handleDomainChange(domain.uid)}
							class="hidden"
						/>
						<div class="flex items-center justify-between font-light">
							<span
								class="{selectedDomain === domain.uid
									? 'font-bold underline'
									: ''} hover:text-gray-700"
							>
								{domain.domain}
							</span>
							<ArrowIcon isSelected={selectedDomain === domain.uid} class="ml-2" />
						</div>
					</label>

					{#if selectedDomain === domain.uid && domain.appellations.length > 0}
						<ul class="ml-6 mt-2 pl-2 text-sm">
							{#each domain.appellations as appellation}
								<li>
									<label class="flex items-center">
										<input
											type="radio"
											name="appellation"
											value={appellation.uid}
											checked={selectedAppellation === appellation.uid}
											on:change={() => handleAppellationChange(appellation.uid)}
											class="mr-2"
										/>
										{appellation}
									</label>
								</li>
							{/each}
						</ul>
					{:else if selectedDomain === domain.uid}
						<p class="ml-4 mt-2 text-sm italic">Aucune appellation trouvée</p>
					{/if}
				</div>
			{/each}
		{:else}
			<p>Aucun domaine disponible</p>
		{/if}
	</div>
</div>
