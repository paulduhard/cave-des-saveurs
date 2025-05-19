<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { createClient } from '@prismicio/client';
	import { repositoryName } from '$lib/prismicio';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Aside from '$lib/components/Aside.svelte';
	import { goto } from '$app/navigation';
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';

	export let data;

	function getWineUrl(wine: any) {
		return `/vin/${wine.uid}`;
	}

	// ESSAYER DE VIRER +PAGE.SERVER.TS (qui sert quasi plus à rien à part relayer params.region.uid) -> ça a l'air bon
	// DANS +LAYOUT.SERVER.JS -> Mapper domaines/couleurs... de la même manière qu'on a fait pour REGIONS
	// CLEANER le format du return dans LAYOUT pour avoir qqchose de consistant (souci avec uid vs slug vs id)
	// RECHERCHER et CLEANER $: (Reactive $: statements) + PARAMS

	$: wineResults = data.allWines.filter((w) => w.regionUID === data.regionUID);
	console.log(data.region.description[0]);

	function getRegionByUID(regionUID: string) {
		return data.regions.find((r) => r.uid === regionUID).data;
	}
</script>

<!-- <h1>
	{data.regionUID}
	{data.allWines.length}
</h1> -->

<div class="container mx-auto mt-12">
	<header class="mx-12 flex flex-grow items-center justify-between">
		<h1
			class="mb-4 font-span text-5xl font-bold transition-all duration-500
			ease-in-out"
		>
			{data.region.region || 'Region'}
		</h1>
		<button
			class="duration-600 mr-12 hidden h-12 border border-primary px-20 font-light text-primary transition-all hover:bg-primary hover:text-secondary md:block"
			on:click={goToHome}>Alcools et spiritueux</button
		>
	</header>

	<p
		class="mb-4 font-span text-lg font-bold transition-all duration-500
ease-in-out"
	>
		{data.region.description[0].text}
	</p>

	<div class="mx-12 flex">
		<!-- <Aside bind:filterData {handleFilterChange} {appellationNames} {getWinesByAppellation} /> -->

		<main class="mx-6 w-3/4">
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

			<div class="my-12 mr-12">
				{#if Object.keys(wineResults).length > 0}
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
					<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each wineResults as wine}
							<div
								transition:fade={{ duration: 600 }}
								class="group flex h-full flex-col font-light"
							>
								<a
									href={getWineUrl(wine)}
									class="duration-600 flex flex-grow flex-col items-start p-4 transition-shadow ease-in-out hover:shadow-lg"
								>
									<!-- <p>{getRegionByUID(wine.regionUID).region}</p> -->
									<PrismicImage field={wine.image} class="self-center" />
									<!-- <span class="mt-8 font-span text-xl">{wine.domaine}</span> -->
									<span class="mb-2 font-span"><PrismicRichText field={wine.title} /></span>
									<PrismicRichText field={wine.resume} />

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
				{:else}
					<p class="top-1/2 w-full text-center" transition:fade={{ duration: 600 }}>
						Aucun vin trouvé pour cette sélection.
					</p>
				{/if}
			</div>
			<!-- <div class="flex justify-center gap-48">
				<div class="my-12">
					<h2 class="text-2xl font-bold">Toutes les appellations</h2>
					<ul>
						{#each filterData.appellations as appellation, index}
							<li>{index + 1}. {appellation.name}</li>
						{/each}
					</ul>
				</div>
				<div class="my-12">
					<h2 class="text-2xl font-bold">Tous les domaines</h2>
					<ul>
						{#each filterData.domains as domaine, index}
							<li>{index + 1}. {domaine.name}</li>
						{/each}
					</ul>
				</div>
			</div> -->
		</main>
	</div>
</div>
