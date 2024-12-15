<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';
	import { goto } from '$app/navigation';
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';

	function goToHome() {
		goto('/'); // Navigates to the home page
	}

	export let data: any;

	let appellationNames: Record<string, string> = {};

	let selectedDomainName = '';
	let selectedDomainDescription: string | null = null;
	let selectedAppellationName = '';
	let selectedAppellationDescription: string | null = null;

	let filterData = {
		colors: [] as string[], // Tableau de chaînes de caractères
		selectedColors: new Set<string>(), // Ensemble de chaînes de caractères
		domains: [] as string[], // Tableau de chaînes de caractères
		selectedDomain: null as string | null, // Chaîne de caractères ou null
		appellations: [] as string[], // Tableau de chaînes de caractères
		displayedAppellations: [] as string[], // Tableau de chaînes de caractères
		selectedAppellation: null as string | null, // Chaîne de caractères ou null
		priceRange: null as number | null // Nombre ou null
	};

	let filteredWines: string[] = [];
	let expandedDomainUid: string | null = null;

	$: groupedWines = filterData.selectedAppellation
		? { [filterData.selectedAppellation]: filteredWines }
		: filterData.selectedDomain
			? filteredWines.reduce((acc, wine) => {
					const appellationUid = wine.data.appellation.uid;
					if (!acc[appellationUid]) {
						acc[appellationUid] = [];
					}
					acc[appellationUid].push(wine);
					return acc;
				}, {})
			: filteredWines.reduce((acc, wine) => {
					const key = `${wine.data.appellation.uid}|${wine.data.domaine.uid}`;
					if (!acc[key]) {
						acc[key] = [];
					}
					acc[key].push(wine);
					return acc;
				}, {});

	function getGroupTitle(key) {
		if (filterData.selectedDomain) {
			return appellationNames[key] || 'Appellation inconnue';
		} else {
			const [appellationUid, domainUid] = key.split('|');
			const appellationName = appellationNames[appellationUid] || 'Appellation inconnue';
			const domainName =
				filterData.domains.find((d) => d.uid === domainUid)?.name || 'Domaine inconnu';
			return { domainName, appellationName };
		}
	}

	function getWineUrl(wine: any) {
		return `/vin/${wine.uid}`;
	}

	const client = createClient(repositoryName);

	onMount(async () => {
		try {
			const colorResponse = await client.getAllByType('couleur');
			filterData.colors = colorResponse.map((color: any) => ({
				uid: color.uid,
				name: color.data.couleur
			}));

			const domainResponse = await client.getAllByType('domaine');
			filterData.domains = domainResponse.map((domain: any) => ({
				uid: domain.uid,
				name: domain.data.domaine || 'Unknown Domain', // Provide a fallback value
				description: domain.data.description || null // Include description
			}));

			const appellationResponse = await client.getAllByType('appellation');
			filterData.appellations = appellationResponse.map((appellation: any) => ({
				uid: appellation.uid,
				name: appellation.data.appellation,
				description: appellation.data.description || null // Include description
			}));

			appellationResponse.forEach((appellation: any) => {
				appellationNames[appellation.uid] = appellation.data.appellation;
			});

			// Extract appellations from wine data
			const appellations = new Set<string>();
			data.wines.forEach((wine: any) => {
				if (wine.data.appellation && wine.data.appellation.uid) {
					appellations.add(
						JSON.stringify({
							uid: wine.data.appellation.uid,
							domainUid: wine.data.domaine.uid
						})
					);
				}
			});
			filterData.appellations = Array.from(appellations).map((appellation: string) =>
				JSON.parse(appellation)
			);

			applyFilters();
		} catch (error) {
			console.error('Error in onMount:', error);
			// ... error handling ...
		}
	});

	function handleFilterChange(filterType: string, value: string) {
		if (filterType === 'color') {
			filterData.selectedColor = value === filterData.selectedColor ? null : value;
		} else if (filterType === 'domain') {
			if (filterData.selectedDomain === value) {
				// Si le même domaine est cliqué à nouveau, réinitialiser l'appellation
				filterData.selectedAppellation = null;
				selectedDomainName = ''; // Réinitialiser le nom du domaine
				selectedDomainDescription = null; // Réinitialiser la description du domaine
				selectedAppellationName = ''; // Réinitialiser le nom de l'appellation
				selectedAppellationDescription = null; // Réinitialiser la description de l'appellation
			} else {
				filterData.selectedDomain = value;
				filterData.selectedAppellation = null; // Réinitialiser l'appellation lorsque le domaine change
				const selectedDomain = filterData.domains.find((domain: any) => domain.uid === value);
				selectedDomainName = selectedDomain ? selectedDomain.name : '';
				selectedDomainDescription = selectedDomain ? selectedDomain.description : null;
				selectedAppellationName = ''; // Réinitialiser le nom de l'appellation
				selectedAppellationDescription = null; // Réinitialiser la description de l'appellation
			}
			updateDisplayedAppellations();
		} else if (filterType === 'appellation') {
			filterData.selectedAppellation = value === filterData.selectedAppellation ? null : value;
			const selectedAppellation = filterData.appellations.find((app: any) => app.uid === value);
			selectedAppellationName = selectedAppellation
				? appellationNames[selectedAppellation.uid]
				: '';
			selectedAppellationDescription = selectedAppellation ? selectedAppellation.description : null;
		} else if (filterType === 'prix') {
			filterData.priceRange = value;
		}
		applyFilters();
	}

	function updateDisplayedAppellations() {
		if (filterData.selectedDomain || expandedDomainUid) {
			const domainUid = filterData.selectedDomain || expandedDomainUid;
			filterData.displayedAppellations = filterData.appellations.filter(
				(app: any) => app.domainUid === domainUid
			);
		} else {
			filterData.displayedAppellations = [];
		}
		filterData = { ...filterData }; // Force Svelte to update
	}

	function applyFilters() {
		filteredWines = data.wines.filter((wine: any) => {
			const colorMatch =
				filterData.selectedColors.size === 0 ||
				filterData.selectedColors.has(wine.data.couleur.uid);
			const domainMatch =
				!filterData.selectedDomain || wine.data.domaine.uid === filterData.selectedDomain;
			const appellationMatch =
				!filterData.selectedAppellation ||
				wine.data.appellation.uid === filterData.selectedAppellation;
			const priceMatch =
				!filterData.priceRange ||
				(wine.data.prix >= filterData.priceRange.min &&
					wine.data.prix <= filterData.priceRange.max);
			return colorMatch && domainMatch && appellationMatch && priceMatch;
		});
	}

	function getWinesByAppellation(appellationUid: string) {
		return data.wines.filter(
			(wine: any) =>
				wine.data.appellation.uid === appellationUid &&
				wine.data.domaine.uid === filterData.selectedDomain
		);
	}

	function resetFilters() {
		filterData.selectedDomain = null;
		filterData.selectedAppellation = null;
		selectedDomainName = '';
		selectedDomainDescription = null;
		selectedAppellationName = '';
		selectedAppellationDescription = null;
		updateDisplayedAppellations();
		applyFilters();
	}

	function resetAppellations() {
		filterData.selectedAppellation = null;
		selectedAppellationName = '';
		selectedAppellationDescription = null;
		updateDisplayedAppellations();
		applyFilters();
	}

	$: {
		applyFilters();
	}
</script>

<div class="container mx-auto mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1>
			<button
				class="mb-4 cursor-pointer font-span text-5xl font-bold transition-all duration-500 ease-in-out"
				on:click={resetFilters}
			>
				{data.region.region || 'Region'}
			</button>
		</h1>
		<button
			class="duration-600 mr-12 h-12 border border-primary px-20 font-light text-primary transition-all hover:bg-primary hover:text-secondary"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<div class="mx-12 flex">
		<Aside bind:filterData {handleFilterChange} {appellationNames} {getWinesByAppellation} />

		<main class="mx-6 w-3/4">
			{#if selectedDomainName}
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
			{/if}
			{#if selectedAppellationName}
				<h3>
					<button
						class="duration-600 pointer-events-none mb-4 w-1/3 min-w-fit border-b border-primary pb-2 text-left text-4xl transition-all ease-in-out"
					>
						{selectedAppellationName}
					</button>
				</h3>
			{/if}
			{#if selectedAppellationDescription}
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
			{/if}

			<div class="my-12 mr-12">
				{#if Object.keys(groupedWines).length > 0}
					{#each Object.entries(groupedWines) as [key, wines]}
						{#if !filterData.selectedAppellation}
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
						{/if}
						<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{#each wines as wine}
								<div
									transition:fade={{ duration: 600 }}
									class="group flex h-full flex-col font-light"
								>
									<a
										href={getWineUrl(wine)}
										class="duration-600 flex flex-grow flex-col items-start p-4 transition-shadow ease-in-out hover:shadow-lg"
									>
										<PrismicImage field={wine.data.image} class="self-center" />
										<span class="mt-8 font-span text-xl">{wine.fullDomainData.domaine}</span>
										<span class="mb-2 font-span"><PrismicRichText field={wine.data.title} /></span>
										<PrismicRichText field={wine.data.resume} />

										<div class="mt-auto pt-4">
											<button
												class="duration-600 inline-block border border-primary px-8 py-2 font-light text-primary transition-all group-hover:bg-primary group-hover:text-secondary"
											>
												Découvrir
											</button>
										</div>
									</a>
								</div>
							{/each}
						</div>
					{/each}
				{:else}
					<p class="top-1/2 w-full text-center" transition:fade={{ duration: 600 }}>
						Aucun vin trouvé pour cette sélection.
					</p>
				{/if}
			</div>
		</main>
	</div>
</div>
