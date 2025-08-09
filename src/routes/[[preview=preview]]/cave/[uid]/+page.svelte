<script lang="ts">
	import WineCard from '$lib/components/WineCard.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Aside from '$lib/components/Aside.svelte';

	export let data: any;

	$: uid = page.params.uid;
	$: currentRegion = data.regions.find((r: any) => r.uid === uid);
	$: regionData = currentRegion?.data;

	$: wineResults = data.allWines?.filter((w: any) => w.regionUID === uid) || [];

	// Filter data for Aside component
	let filterData = {
		colors: [] as Array<{ uid: string; name: string }>,
		selectedColors: new Set<string>(),
		domains: [] as Array<{
			uid: string;
			name: string;
			appellations: Array<{ uid: string; name: string }>;
		}>,
		selectedDomain: null as string | null,
		appellations: [] as Array<{ uid: string; name: string }>,
		selectedAppellation: null as string | null,
		priceRange: { min: 5, max: 200 }
	};

	// Initialize filter data from server data
	$: if (data) {
		filterData.colors =
			data.colors?.map((color: any) => ({
				uid: color.uid,
				name: color.data?.couleur || color.uid
			})) || [];

		// Extract domains from wines
		const domainMap = new Map();
		const appellationMap = new Map();

		data.allWines?.forEach((wine: any) => {
			// Extract domain info
			if (wine.domaineName && wine.domaineName !== 'Domaine non spécifié') {
				const domainUid = wine.domaineName.toLowerCase().replace(/\s+/g, '-');
				if (!domainMap.has(domainUid)) {
					domainMap.set(domainUid, {
						uid: domainUid,
						name: wine.domaineName,
						appellations: []
					});
				}
			}

			// Extract appellation info from wine data if it exists
			if (wine.appellation?.data?.appellation) {
				const appellationName = wine.appellation.data.appellation;
				const appellationUid =
					wine.appellation.uid || appellationName.toLowerCase().replace(/\s+/g, '-');

				if (!appellationMap.has(appellationUid)) {
					appellationMap.set(appellationUid, {
						uid: appellationUid,
						name: appellationName
					});
					(appellationNames as any)[appellationUid] = appellationName;
				}

				// Link appellation to domain
				if (wine.domaineName && wine.domaineName !== 'Domaine non spécifié') {
					const domainUid = wine.domaineName.toLowerCase().replace(/\s+/g, '-');
					const domain = domainMap.get(domainUid);
					if (domain && !domain.appellations.some((a: any) => a.uid === appellationUid)) {
						domain.appellations.push({
							uid: appellationUid,
							name: appellationName
						});
					}
				}
			}
		});

		filterData.domains = Array.from(domainMap.values()) as Array<{
			uid: string;
			name: string;
			appellations: Array<{ uid: string; name: string }>;
		}>;
	}

	// Appellation names mapping
	let appellationNames: Record<string, string> = {};

	// Filter change handler
	function handleFilterChange(filterType: string, value: any) {
		if (filterType === 'color') {
			if (typeof value === 'string') {
				if (filterData.selectedColors.has(value)) {
					filterData.selectedColors.delete(value);
				} else {
					filterData.selectedColors.add(value);
				}
				filterData.selectedColors = new Set(filterData.selectedColors);
			} else if (value instanceof Set) {
				filterData.selectedColors = value;
			}
		} else if (filterType === 'domain') {
			filterData.selectedDomain = value;
		} else if (filterType === 'appellation') {
			filterData.selectedAppellation = value;
		} else if (filterType === 'prix') {
			filterData.priceRange = value;
		}

		// Update wine results based on filters
		updateWineResults();
	}

	// Update wine results based on active filters
	function updateWineResults() {
		let filtered = data.allWines?.filter((w: any) => w.regionUID === uid) || [];

		// Filter by colors
		if (filterData.selectedColors.size > 0) {
			filtered = filtered.filter((wine: any) => {
				// Check if wine has couleur field and matches selected colors
				const wineColorUid = wine.couleur?.uid || wine.couleur;
				return wineColorUid && filterData.selectedColors.has(wineColorUid);
			});
		}

		// Filter by domain
		if (filterData.selectedDomain) {
			const selectedDomain = filterData.domains.find(
				(d: any) => d.uid === filterData.selectedDomain
			);
			if (selectedDomain) {
				filtered = filtered.filter((wine: any) => wine.domaineName === selectedDomain.name);
			}
		}

		// Filter by appellation
		if (filterData.selectedAppellation) {
			filtered = filtered.filter((wine: any) => {
				const appellationUid =
					wine.appellation?.uid ||
					wine.appellation?.data?.appellation?.toLowerCase().replace(/\s+/g, '-');
				return appellationUid === filterData.selectedAppellation;
			});
		}

		// Filter by price range
		if (filterData.priceRange) {
			filtered = filtered.filter((wine: any) => {
				const price = wine.prix || 0;
				return price >= filterData.priceRange.min && price <= filterData.priceRange.max;
			});
		}

		wineResults = filtered;
	}

	// Get wines by appellation
	function getWinesByAppellation(appellationUid: string) {
		return (
			data.allWines?.filter((wine: any) => {
				const wineAppellationUid =
					wine.appellation?.uid ||
					wine.appellation?.data?.appellation?.toLowerCase().replace(/\s+/g, '-');
				return wineAppellationUid === appellationUid;
			}) || []
		);
	}

	function goToHome() {
		goto('/'); // Navigates to the home page
	}
</script>

<div class="container mx-auto mt-12">
	<header class="flex flex-grow items-center justify-between">
		<h1
			class="mb-4 w-full font-span text-4xl font-bold transition-all duration-500
			ease-in-out md:text-5xl"
		>
			{regionData?.region || 'Region'}
		</h1>
		<button
			class="duration-600 hidden h-12 w-fit whitespace-nowrap border border-primary px-20 font-light text-primary transition-all hover:bg-primary hover:text-secondary md:block"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<div class="md:flex">
		<Aside bind:filterData {handleFilterChange} {appellationNames} {getWinesByAppellation} />

		<main class="md:mx-6 md:w-3/4">
			<p
				class="mb-4 w-full font-span text-lg font-bold transition-all duration-500 ease-in-out
md:mx-12"
			>
				{regionData?.description?.[0]?.text || ''}
			</p>
			<!-- {#if selectedDomainName}
				<h2>
					<button
						class="duration-600 inline-flex w-2/5 min-w-fit items-center gap-2 text-4xl transition-all ease-in-out {selectedAppellationName
							? 'mb-0 border-none pb-0 text-lg'
							: 'pointer-events-none mb-4 border-b border-primary pb-4'}"
						on:click={resetAppellations}
					>
						{selectedDomainName}
						{#if selectedAppellationName}
							<ArrowIcon class="translate-y-[2px] -rotate-90 transform" />
						{/if}
					</button>
				</h2>
			{/if} -->
			<!-- {#if selectedAppellationName}
				<h3>
					<button
						class="duration-600 pointer-events-none mb-4 w-1/3 min-w-fit border-b border-primary pb-2 text-left text-4xl transition-all ease-in-out"
					>
						{selectedAppellationName}
					</button>
				</h3>
			{/if} -->
			<!-- {#if selectedAppellationDescription}
			<PrismicRichText
				field={selectedAppellationDescription}
				class="duration-600 opacity-100 transition-opacity ease-in-out"
			/>
			{:else if selectedDomainDescription}
				<PrismicRichText
					field={selectedDomainDescription}
					class="duration-600 opacity-100 transition-opacity ease-in-out"
				/>
			{:else}
				<PrismicRichText
					field={data.region.description}
					class="duration-600 opacity-100 transition-opacity ease-in-out"
				/>
			{/if} -->

			<!-- {#if !filterData.selectedAppellation}
							<h3
								class="mb-4 flex w-1/3 min-w-fit items-center border-b border-primary pb-2 text-lg"
							>
								{#if filterData.selectedDomain}
									<ArrowIcon class="mx-2 translate-y-[2px] -rotate-90 transform" />
									<span>{getGroupTitle(key)}</span>
								{:else}
									{@const { domainName, appellationName } = getGroupTitle(key)}
									<span>{domainName}</span>
									<ArrowIcon class="mx-2 translate-y-[2px] -rotate-90 transform" />
									<span>{appellationName}</span>
								{/if}
							</h3>
						{/if} -->

			<!-- GRILLE DE RESULTATS DES CUVEES -->
			<div class="my-12">
				{#if Object.keys(wineResults).length > 0}
					<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each wineResults as wine (wine.uid)}
							<WineCard {wine} />
						{/each}
					</div>
				{:else}
					<p class="top-1/2 w-full text-center" transition:fade={{ duration: 700 }}>
						Aucun vin trouvé pour cette sélection.
					</p>
				{/if}
			</div>
		</main>
	</div>
</div>
