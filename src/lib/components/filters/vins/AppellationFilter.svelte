<script>
	import { createEventDispatcher } from 'svelte';

	export let appellations = [];
	export let selectedAppellation = null;

	const dispatch = createEventDispatcher();

	function handleAppellationChange(appellationUid) {
		dispatch('filterChange', { type: 'selectedAppellation', value: appellationUid });
	}
</script>

<div class="mb-6 border-t border-primary">
	<h2 class="mb-2 mt-4 text-xl uppercase">Appellations</h2>

	<div>
		{#if appellations && appellations.length > 0}
			<ul class="ml-6 mt-2 pl-2 text-sm">
				{#each appellations as appellation}
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
		{:else}
			<p class="ml-4 mt-2 text-sm italic">Aucune appellation trouvée</p>
		{/if}
	</div>
</div>
