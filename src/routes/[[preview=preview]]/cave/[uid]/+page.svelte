<script>
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	function getWineUrl(wine) {
		return `/vin/${wine.uid}`;
	}

	export let data;

	let colors = [];
	let selectedColors = [];
	let filteredWines = [];

	const client = createClient(repositoryName);

	onMount(async () => {
		try {
			const response = await client.getAllByType('couleur');
			colors = response.map((color) => ({
				uid: color.uid,
				name: color.data.couleur
			}));
		} catch (error) {
			console.error('Error fetching colors:', error);
			colors = [];
		}
	});

	$: {
		if (selectedColors.length === 0) {
			filteredWines = data.wines;
		} else {
			filteredWines = data.wines.filter((wine) => selectedColors.includes(wine.data.couleur.uid));
		}
	}

	function handleColorChange(color) {
		if (selectedColors.includes(color)) {
			selectedColors = selectedColors.filter((c) => c !== color);
		} else {
			selectedColors = [...selectedColors, color];
		}
		console.log('Selected colors:', selectedColors);
		// Here you can add logic to filter products based on selected colors
	}
</script>

<div class="flex">
	<aside class="bg-gray-100 w-1/5 p-4">
		<h2 class="mb-4 text-xl uppercase">Couleurs</h2>
		<form class="space-y-2">
			{#each colors as color}
				<div>
					<label class="cursor-pointer items-center">
						<input
							type="checkbox"
							value={color.uid}
							checked={selectedColors.includes(color.uid)}
							on:change={() => handleColorChange(color.uid)}
							class="form-checkbox text-blue-600 mr-3 h-5 w-5 cursor-pointer"
						/>
						<span class="text-lg">{color.name}</span>
					</label>
				</div>
			{/each}
		</form>
	</aside>

	<main class="w-4/5 p-4">
		{#if data.region}
			<h1 class="mb-4 text-2xl font-bold">{data.region.region || 'Region'}</h1>
			<PrismicRichText field={data.region.description} />
		{:else}
			<p>No region data available.</p>
		{/if}

		<div class="my-24 mr-12">
			{#if filteredWines && filteredWines.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredWines as wine}
						<div transition:fade={{ duration: 300 }}>
							<a
								href={getWineUrl(wine)}
								class="flex flex-col items-start justify-center p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg"
							>
								<PrismicImage field={wine.data.image} class="self-center" />
								{wine.fullDomainData.domaine}
								<PrismicRichText field={wine.data.title} />
								<PrismicRichText field={wine.data.resume} />
								<button class="mt-4 inline-block border px-8 py-2"> Découvrir </button>
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<p transition:fade={{ duration: 300 }}>Aucun vin trouvé pour cette couleur.</p>
			{/if}
		</div>
	</main>
</div>
