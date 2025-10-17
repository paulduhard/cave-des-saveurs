<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Fuse from 'fuse.js';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { isSearchModalOpen } from '$lib/stores/searchStore';
	import { asText } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';

	// Import Product Cards and components
	import WineCard from '$lib/components/WineCard.svelte';
	import AlcoolsCard from '$lib/components/AlcoolsCard.svelte';
	import EpicerieCard from '$lib/components/EpicerieCard.svelte';
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';

	export let searchableData: any[] = [];

	let searchTerm = '';
	let searchResults = [];
	let fuse;

	// Reactive Fuse initialization
	$: {
		const options = {
			keys: ['unified_title', 'data.type', 'data.region.data.region'],
			includeScore: true,
			threshold: 0.3,
			minMatchCharLength: 2
		};
		if (searchableData.length > 0) {
			fuse = new Fuse(searchableData, options);
		}
	}

	function handleSearch() {
		if (fuse && searchTerm.length > 1) {
			searchResults = fuse.search(searchTerm);
		} else {
			searchResults = [];
		}
	}

	function closeModal() {
		isSearchModalOpen.set(false);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isSearchModalOpen}
	<div
		class="fixed inset-0 top-[85px] z-50 overflow-y-auto"
		style="background-color: white;"
		transition:fade={{ duration: 300 }}
	>
		<!-- Main container with no-click propagation -->
		<div class="container mx-auto px-6 py-8">
			<button
				class="text-gray-500 hover:text-gray-800 absolute right-4 top-4 z-10 pr-8"
				on:click={closeModal}
				aria-label="Fermer la recherche"
			>
				<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<div class="mx-auto max-w-2xl pt-32">
				<div class="relative flex items-center">
					<input
						type="search"
						bind:value={searchTerm}
						on:input={handleSearch}
						placeholder="Rechercher"
						class="border-gray-300 bg-transparent w-full border-0 border-b-2 p-4 text-left text-2xl focus:border-primary focus:ring-0"
						autofocus
					/>
					<button class="absolute right-4" aria-label="Lancer la recherche" on:click={handleSearch}>
						<ArrowIcon class="h-6 w-6 -rotate-90 text-primary" />
					</button>
				</div>
			</div>

			<div class="mt-12">
				{#if searchResults.length > 0}
					<!-- Mobile Layout: List -->
					<div class="md:hidden">
						<ul>
							{#each searchResults as result (result.item.id)}
								<li>
									<a
										href={result.item.unified_url}
										on:click={closeModal}
										class="border-gray-100 flex items-center gap-4 border-b p-4"
									>
										<div class="w-1/4 flex-shrink-0">
											<img
												src={result.item.data.image?.url || '/assets/placeholder.png'}
												alt={result.item.unified_title}
												class="h-24 w-auto object-contain"
											/>
										</div>
										<div class="w-3/4 text-left">
											<p class="text-gray-800 font-span font-semibold">
												{result.item.unified_title}
											</p>
											<p class="text-gray-500 font-span text-sm">{result.item.unified_type}</p>
										</div>
									</a>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Desktop Layout: Grid -->
					<div class="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
						{#each searchResults as result (result.item.id)}
							<div animate:flip={{ duration: 300 }}>
								<a href={result.item.unified_url} on:click={closeModal} class="h-full">
									{#if result.item.unified_type === 'Vin'}
										<WineCard wine={result.item} />
									{:else if result.item.unified_type === 'Spiritueux'}
										<AlcoolsCard product={result.item} />
									{:else if result.item.unified_type === 'Épicerie'}
										<EpicerieCard product={result.item} />
									{/if}
								</a>
							</div>
						{/each}
					</div>
				{:else if searchTerm.length > 1}
					<div class="py-16 text-center">
						<p class="text-gray-500 text-2xl">
							Désolé, nous n’avons trouvé aucun résultat pour votre recherche “{searchTerm}”
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
