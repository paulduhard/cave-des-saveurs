<script>
	import { onMount } from 'svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';

	let regions = [];
	let colors = [];

	import { repositoryName } from '$lib/prismicio';

	const client = createClient(repositoryName);

	onMount(async () => {
		await Promise.all([fetchRegions(), fetchColors()]);
	});

	function sortByOrderMenu(items) {
		return items.sort((a, b) => {
			if (a.data.ordre_menu === undefined) return 1;
			if (b.data.ordre_menu === undefined) return -1;
			return a.data.ordre_menu - b.data.ordre_menu;
		});
	}

	async function fetchRegions() {
		try {
			const response = await client.getAllByType('region');
			regions = sortByOrderMenu(response);
		} catch (error) {
			console.error('Error fetching regions:', error);
		}
	}

	async function fetchColors() {
		try {
			const response = await client.getAllByType('couleur'); // Assurez-vous que 'color' est le bon type dans Prismic
			console.log('Fetched colors:', response);
			colors = sortByOrderMenu(response);
		} catch (error) {
			console.error('Error fetching colors:', error);
		}
	}
</script>

<nav class="my-6 flex justify-center gap-20">
	<div class="region">
		<p class="mb-2 uppercase">Nos vins par région</p>
		<ul class="flex max-h-[215px] flex-col flex-wrap gap-x-12 overflow-y-auto pr-2">
			{#each regions as region (region.id)}
				<li>
					<!-- <PrismicLink document={region}> -->
					{region.data.region}
					<!-- </PrismicLink> -->
				</li>
			{/each}
		</ul>
	</div>
	<ul>
		<p class="mb-2 uppercase">Nos vins par couleur</p>
		{#each colors as color (color.id)}
			<li>
				<PrismicLink document={color}>
					{color.data.couleur}
				</PrismicLink>
			</li>
		{/each}
	</ul>

	<div class="alcools">
		<p class="uppercase">Alcools et spiritueux</p>
		<ul class="flex max-h-[215px] flex-col flex-wrap gap-x-12 overflow-y-auto pr-2">
			<li>Cognacs</li>
			<li>Armagnacs</li>
			<li>Whiskies</li>
			<li>Rhums</li>
			<li>Gin</li>
			<li>Eaux de vie et liqueurs</li>
			<li>Anisés</li>
			<li>Téquilas et Mezcals</li>
			<li>Apéritifs et mixologie</li>
			<li>Bières</li>
		</ul>
	</div>
</nav>
