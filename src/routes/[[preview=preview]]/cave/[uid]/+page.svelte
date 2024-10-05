<script>
	import { SliceZone } from '@prismicio/svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	import Aside from '$lib/components/Aside.svelte';
	import { components } from '$lib/slices';
	import { goto } from '$app/navigation';
	import VinCard from '$lib/components/vin/VinCard.svelte';

	export let data;

	function goToHome() {
		goto('/');
	}

	function getWineUrl(wine) {
		return `/vin/${wine.uid}`;
	}
</script>

<SliceZone slices={data.page.data.slices} {components} />

<div class="container mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1 class="mb-4 font-span text-6xl font-bold">{data.region.region || 'Region'}</h1>
		<button
			class="mr-12 h-12 border border-primary px-20 font-light text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<div class="mx-12 flex">
		<Aside />

		<main class="mx-6 w-3/4">
			<PrismicRichText field={data.region.description} />
			<div class="my-24 mr-12">
				{#if data.wines && data.wines.length > 0}
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each data.wines as wine (wine.id)}
							<VinCard {wine} {getWineUrl} />
						{/each}
					</div>
				{:else}
					<p>Aucun vin trouvé pour cette région.</p>
				{/if}
			</div>
		</main>
	</div>
</div>
