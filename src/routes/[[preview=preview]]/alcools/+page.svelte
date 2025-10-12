<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import AlcoolsCard from '$lib/components/AlcoolsCard.svelte';
	import AlcoolsFilter from '$lib/components/AlcoolsFilter.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores'; // Import $page store
	import { slugify } from '$lib/utils/slugify'; // Import slugify for comparison

	import { components } from '$lib/slices';
	import type { PageData } from './$types';

	export let data: PageData;

	// Get unique types from all products
	$: availableTypes = Array.from(
		new Set((data.allProducts || []).map((product: any) => product.type).filter(Boolean))
	)
		.map((type) => ({
			value: type,
			label: type
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	// Get only regions that have products
	$: availableRegions = (() => {
		const regionUids = new Set(
			(data.allProducts || []).map((product: any) => product.regionUID).filter(Boolean)
		);
		return (data.regions || []).filter((region) => regionUids.has(region.uid));
	})();

	// Convert prix string to numeric value for filtering
	function priceRangeToNumber(priceRange: string): number {
		switch (priceRange) {
			case '5-10':
				return 7.5;
			case '11-20':
				return 15.5;
			case '21-40':
				return 30.5;
			case '41-80':
				return 60.5;
			case '81-120':
				return 100.5;
			case '121':
				return 121;
			default:
				return 7.5;
		}
	}

	// Filter data - initialize with proper values
	let selectedType: string | null;
	$: {
		const typeSlug = $page.url.searchParams.get('type');
		if (typeSlug && availableTypes.length > 0) {
			const foundType = availableTypes.find((t) => slugify(t.value) === typeSlug);
			selectedType = foundType ? foundType.value : null;
		} else {
			selectedType = null;
		}
	}
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
	$: filteredProducts = (data.allProducts || []).filter((product) => {
		if (selectedType && product.type !== selectedType) {
			return false;
		}
		if (selectedRegion && product.regionUID !== selectedRegion) {
			return false;
		}
		if (selectedPriceRange) {
			const productPrice = priceRangeToNumber(product.prix);
			if (productPrice < selectedPriceRange.min || productPrice > selectedPriceRange.max) {
				return false;
			}
		}
		return true;
	});

	// Handle filter changes
	function handleFilterChange(
		filterType: 'type' | 'region' | 'prix',
		value: string | { min: number; max: number } | null
	) {
		if (filterType === 'type') {
			const newType = value as string | null;
			const currentUrl = new URL($page.url);
			if (newType) {
				currentUrl.searchParams.set('type', slugify(newType));
			} else {
				currentUrl.searchParams.delete('type');
			}
			goto(currentUrl.toString(), { replaceState: true });
		} else if (filterType === 'region') {
			selectedRegion = value as string | null;
		} else if (filterType === 'prix' && typeof value === 'object' && value !== null) {
			selectedPriceRange = value;
		}
	}

	function goToCave() {
		goto('/cave/provence-et-corse'); // Navigates to the home page
	}
</script>

<svelte:head>
	<title>{data.title || 'Alcools et spiritueux - Cave des Saveurs'}</title>
	<meta
		name="description"
		content={data.meta_description || "Découvrez notre sélection d'Alcools et spiritueux"}
	/>
	{#if data.meta_image?.url}
		<meta property="og:image" content={data.meta_image.url} />
	{/if}
</svelte:head>

<div class="mx-auto mt-12">
	<header class="container flex flex-grow items-center justify-between">
		<h1
			class="mb-4 w-full font-span text-4xl font-bold transition-all duration-500
			ease-in-out md:text-5xl"
			in:fade={{ duration: 300, delay: 100 }}
			out:fade={{ duration: 200 }}
		>
			Alcools et spiritueux
		</h1>
		<button
			class="duration-600 hidden h-12 min-w-fit border border-primary px-12 font-light text-primary transition-all hover:bg-primary hover:text-secondary md:block"
			on:click={goToCave}>La cave à vins</button
		>
	</header>

	<div class="container md:flex">
		<!-- Aside desktop uniquement (à gauche) -->
		<div class="hidden md:block">
			<AlcoolsFilter bind:filterData {handleFilterChange} />
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
					{@const region = availableRegions.find((r) => r.uid === selectedRegion)}
					{#if region}
						<h2
							class="mb-2 border-b border-primary pb-4 font-span text-2xl font-bold md:mx-12 md:text-4xl"
						>
							{region.data.region}
						</h2>
					{/if}
				{/if}
				<p class="mb-4 w-full font-span text-lg transition-all duration-500 ease-in-out md:mx-12">
					Découvrez notre sélection d'Alcools et spiritueux
					{#if selectedType || selectedRegion}
						{#if selectedType && selectedRegion}
							{@const region = availableRegions.find((r) => r.uid === selectedRegion)}
							- {selectedType} de {region?.data.region || ''}
						{:else if selectedType}
							- {selectedType}
						{:else if selectedRegion}
							{@const region = availableRegions.find((r) => r.uid === selectedRegion)}
							- {region?.data.region || ''}
						{/if}
					{/if}
				</p>
			</div>

			<!-- Aside mobile uniquement (après description) -->
			<div class="block md:hidden">
				<AlcoolsFilter bind:filterData {handleFilterChange} />
			</div>

			<!-- GRILLE DE RESULTATS DES PRODUITS -->
			<div class="my-12">
				{#if filteredProducts.length > 0}
					<div
						class="relative mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
						in:fade={{ duration: 400, delay: 200 }}
						out:fade={{ duration: 200 }}
					>
						{#each filteredProducts as product, i (product.uid)}
							<div
								in:fade={{ duration: 300, delay: i * 50 }}
								out:fade={{ duration: 300 }}
								animate:flip={{ duration: 300 }}
							>
								<AlcoolsCard {product} />
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

<!-- Page slices for intro content -->
{#if data.page?.data?.slices && data.page.data.slices.length > 0}
	<SliceZone slices={data.page.data.slices} {components} />
{/if}
