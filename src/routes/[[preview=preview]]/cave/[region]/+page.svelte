<script>
	import { SliceZone } from '@prismicio/svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	import Aside from '$lib/components/Aside.svelte';
	import { components } from '$lib/slices';
	import VinGrid from '$lib/components/vin/VinGrid.svelte';
	import { onMount } from 'svelte'; // Importation de onMount
	import { vinFilters } from '$lib/stores/vinFilters'; // Importation du store vinFilters

	export let data;

	function getWineUrl(wine) {
		return `/cave/${wine.data.region.uid}/vin/${wine.uid}`;
	}

	// Initialisation des filtres dans onMount
	onMount(() => {
		if (data.region && data.region.domaines && data.region.domaines.length > 0) {
			const firstDomaine = data.region.domaines[0];
			const firstAppellation = firstDomaine.appellations[0];

			vinFilters.setInitialData({
				colors: data.colors,
				domains: data.region.domaines,
				appellations: data.region.appellations,
				regions: [data.region],
				wines: data.wines,
				selectedRegion: data.region.uid
			});
		}
	});
</script>

<SliceZone slices={data.page.data.slices} {components} />

<div class="container mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
		<a
			href="/"
			class="mr-12 flex h-12 items-center justify-center border border-primary px-20 font-light text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
			>Alcools et spiritueux</a
		>
	</header>

	<div class="mx-12 flex">
		<Aside region={data.region} />

		<main class="mx-6 w-3/4">
			<PrismicRichText field={data.region.description} />
			<div class="my-24 mr-12">
				{#if data.wines && data.wines.length > 0}
					<VinGrid wines={data.wines} {getWineUrl} /> <!-- Passage des vins à VinGrid -->
				{:else}
					<p>Aucun vin trouvé pour cette région.</p>
				{/if}
			</div>
		</main>
	</div>
</div>
