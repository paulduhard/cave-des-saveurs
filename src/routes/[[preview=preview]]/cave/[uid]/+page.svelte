<script lang="ts">
	import WineCard from '$lib/components/WineCard.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Aside from '$lib/components/Aside.svelte';

	export let data: any;

	let previousUid = '';

	// Invalider les données quand on change de région (côté client uniquement)
	$: if (browser && page.params.uid && page.params.uid !== previousUid) {
		previousUid = page.params.uid;
		if (previousUid) {
			invalidate('cave:region');
		}
	}

	$: uid = page.params.uid;
	$: currentRegion = data.regions.find((r: any) => r.uid === uid);
	$: regionData = currentRegion?.data;

	// État des filtres
	let selectedAppellationUid: string | null = null;
	let selectedDomaineUid: string | null = null;

	// wineResults devient une variable PUREMENT réactive
	$: wineResults = (() => {
		let filtered = data.allWines?.filter((w: any) => w.regionUID === uid) || [];

		// Filter by colors
		if (filterData.selectedColors.size > 0) {
			filtered = filtered.filter((wine: any) => {
				const wineColorUid = wine.couleur?.uid || wine.couleur;
				return wineColorUid && filterData.selectedColors.has(wineColorUid);
			});
		}

		// Filter by domain
		if (selectedDomaineUid) {
			const selectedDomain = regionDomaines.find((d: any) => d.uid === selectedDomaineUid);
			if (selectedDomain) {
				filtered = filtered.filter((wine: any) => wine.domaineName === selectedDomain.name);
			}
		}

		// Filter by appellation
		if (selectedAppellationUid) {
			filtered = filtered.filter((wine: any) => {
				const appellationUid = wine.appellation?.uid;
				return appellationUid === selectedAppellationUid;
			});
		}

		// Filter by price range
		if (filterData.priceRange) {
			filtered = filtered.filter((wine: any) => {
				const price = wine.prix || 0;
				return price >= filterData.priceRange.min && price <= filterData.priceRange.max;
			});
		}

		return filtered;
	})();

	// 🍇 Facettes d'appellations pour la région courante (dédoublonnées, triées alphabétiquement)
	// Basées sur TOUS les vins de la région, pas les vins filtrés
	$: regionAppellations = Array.from(
		(data.allWines?.filter((w: any) => w.regionUID === uid) || [])
			.filter((wine: any) => wine.appellation?.uid && wine.appellation?.data?.appellation)
			.reduce((map: Map<string, any>, wine: any) => {
				const uid = wine.appellation.uid;
				if (!map.has(uid)) {
					map.set(uid, {
						uid,
						name: wine.appellation.data.appellation
					});
				}
				return map;
			}, new Map<string, any>())
			.values()
	).sort((a: any, b: any) => a.name.localeCompare(b.name)) as Array<{ uid: string; name: string }>;

	// 🏰 Facettes de domaines pour la région courante (dédoublonnées, triées alphabétiquement)
	$: regionDomaines = Array.from(
		(data.allWines?.filter((w: any) => w.regionUID === uid) || [])
			.filter((wine: any) => wine.domaineName && wine.domaineName !== 'Domaine non spécifié')
			.reduce((map: Map<string, any>, wine: any) => {
				const uid = wine.domaineName.toLowerCase().replace(/\s+/g, '-');
				if (!map.has(uid)) {
					map.set(uid, {
						uid,
						name: wine.domaineName,
						appellations: []
					});
				}
				return map;
			}, new Map<string, any>())
			.values()
	).sort((a: any, b: any) => a.name.localeCompare(b.name)) as Array<{
		uid: string;
		name: string;
		appellations: Array<{ uid: string; name: string }>;
	}>;

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
			// Le toggle est géré par l'Aside via bind:selectedAppellationUid
		} else if (filterType === 'prix') {
			filterData.priceRange = value;
		}

		// Pas besoin d'appeler updateWineResults(), wineResults est maintenant réactif
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
		<Aside
			bind:filterData
			{handleFilterChange}
			{appellationNames}
			{getWinesByAppellation}
			{regionAppellations}
			{regionDomaines}
			bind:selectedAppellationUid
			bind:selectedDomaineUid
		/>

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
				{#if wineResults.length > 0}
					<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each wineResults as wine (wine.uid)}
							<div animate:flip={{ duration: 300 }} in:fade={{ duration: 150 }}>
								<WineCard {wine} />
							</div>
						{/each}
					</div>
				{:else}
					<p class="top-1/2 w-full text-center" transition:fade={{ duration: 300 }}>
						Aucun vin trouvé pour cette sélection.
					</p>
				{/if}
			</div>
		</main>
	</div>
</div>
