<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import EpicerieCard from '$lib/components/EpicerieCard.svelte';
	import EpicerieFilter from '$lib/components/EpicerieFilter.svelte';
	import { fade, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { components } from '$lib/slices';
	import type { PageData } from './$types';

	export let data: PageData;

	// Get unique types from all products
	$: availableTypes = Array.from(
		new Set(
			(data.allProducts || [])
				.map((product: any) => product.type)
				.filter(Boolean)
		)
	).map(type => ({
		value: type,
		label: type
	})).sort((a, b) => a.label.localeCompare(b.label));

	// Get only regions that have products
	$: availableRegions = (() => {
		const regionUids = new Set(
			(data.allProducts || [])
				.map((product: any) => product.regionUID)
				.filter(Boolean)
		);
		return (data.regions || []).filter(region => regionUids.has(region.uid));
	})();

	// Convert prix string to numeric value for filtering
	function priceRangeToNumber(priceRange: string): number {
		switch (priceRange) {
			case '5-10': return 7.5;
			case '11-20': return 15.5;
			case '21-40': return 30.5;
			case '41-80': return 60.5;
			case '81-120': return 100.5;
			case '121': return 121;
			default: return 7.5;
		}
	}

	// Filter data - initialize with proper values
	let selectedType: string | null = null;
	let selectedRegion: string | null = null;
	let selectedPriceRange = { min: 5, max: 120 };

	$: filterData = {
		types: availableTypes,
		selectedType: selectedType,
		regions: availableRegions,
		selectedRegion: selectedRegion,
		priceRange: selectedPriceRange
	};

	// Reactive filtered products
	$: filteredProducts = (() => {
		let filtered = data.allProducts || [];

		// Filter by type
		if (selectedType) {
			filtered = filtered.filter((product: any) => product.type === selectedType);
		}

		// Filter by region
		if (selectedRegion) {
			filtered = filtered.filter((product: any) => product.regionUID === selectedRegion);
		}

		// Filter by price range
		if (selectedPriceRange) {
			filtered = filtered.filter((product: any) => {
				const productPrice = priceRangeToNumber(product.prix);
				return productPrice >= selectedPriceRange.min && productPrice <= selectedPriceRange.max;
			});
		}

		return filtered;
	})();

	// Handle filter changes
	function handleFilterChange(
		filterType: 'type' | 'region' | 'prix',
		value: string | { min: number; max: number } | null
	) {
		if (filterType === 'type') {
			selectedType = value as string | null;
		} else if (filterType === 'region') {
			selectedRegion = value as string | null;
		} else if (filterType === 'prix' && typeof value === 'object' && value !== null) {
			selectedPriceRange = value;
		}
	}
</script>

<svelte:head>
	<title>{data.title || 'Épicerie - Cave des Saveurs'}</title>
	<meta name="description" content={data.meta_description || 'Découvrez notre sélection d\'épicerie fine'} />
	{#if data.meta_image?.url}
		<meta property="og:image" content={data.meta_image.url} />
	{/if}
</svelte:head>

<!-- Page slices for intro content -->
{#if data.page?.data?.slices && data.page.data.slices.length > 0}
	<SliceZone slices={data.page.data.slices} {components} />
{/if}

<div class="mx-auto mt-12">
	<header class="container flex flex-grow items-center justify-between">
		<h1
			class="mb-4 w-full font-span text-4xl font-bold transition-all duration-500
			ease-in-out md:text-5xl"
			in:fade={{ duration: 300, delay: 100 }}
			out:fade={{ duration: 200 }}
		>
			Épicerie fine
		</h1>
	</header>

	<div class="container md:flex">
		<!-- Aside desktop uniquement (à gauche) -->
		<div class="hidden md:block">
			<EpicerieFilter bind:filterData {handleFilterChange} />
		</div>

		<main class="md:mx-6 md:w-3/4">
			<!-- Dynamic title and description when filters are active -->
			<div in:fade={{ duration: 300, delay: 150 }} out:fade={{ duration: 200 }}>
				{#if selectedType}
					<h2
						class="mb-2 border-b border-primary pb-4 font-span text-2xl font-bold md:mx-12 md:text-4xl"
					>
						{selectedType}
					</h2>
				{/if}
				{#if selectedRegion}
					{@const region = availableRegions.find(r => r.uid === selectedRegion)}
					{#if region}
						<h2
							class="mb-2 border-b border-primary pb-4 font-span text-2xl font-bold md:mx-12 md:text-4xl"
						>
							{region.data.region}
						</h2>
					{/if}
				{/if}
				<p class="mb-4 w-full font-span text-lg transition-all duration-500 ease-in-out md:mx-12">
					Découvrez notre sélection d'épicerie fine
					{#if selectedType || selectedRegion}
						{#if selectedType && selectedRegion}
							{@const region = availableRegions.find(r => r.uid === selectedRegion)}
							- {selectedType} de {region?.data.region || ''}
						{:else if selectedType}
							- {selectedType}
						{:else if selectedRegion}
							{@const region = availableRegions.find(r => r.uid === selectedRegion)}
							- {region?.data.region || ''}
						{/if}
					{/if}
				</p>
			</div>

			<!-- Aside mobile uniquement (après description) -->
			<div class="block md:hidden">
				<EpicerieFilter bind:filterData {handleFilterChange} />
			</div>

			<!-- GRILLE DE RESULTATS DES PRODUITS -->
			<div class="my-12">
				{#if filteredProducts.length > 0}
					<div
						class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
						in:fade={{ duration: 400, delay: 200 }}
						out:fade={{ duration: 200 }}
					>
						{#each filteredProducts as product, i (product.uid)}
							<div in:fade={{ duration: 200, delay: i * 50 }} animate:flip={{ duration: 300 }}>
								<EpicerieCard {product} />
							</div>
						{/each}
					</div>
				{:else}
					<p
						class="top-1/2 w-full text-center"
						in:fade={{ duration: 300, delay: 200 }}
						out:fade={{ duration: 200 }}
					>
						Aucun produit trouvé pour cette sélection.
					</p>
				{/if}
			</div>
		</main>
	</div>
</div>
