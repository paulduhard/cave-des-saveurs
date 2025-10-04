<script lang="ts">
	import type { Writable } from 'svelte/store';
	import ArrowIcon from './ArrowIcon.svelte';
	import { spring } from 'svelte/motion';

	interface Domain {
		uid: string;
		name: string;
		appellations: Appellation[];
	}

	interface Appellation {
		uid: string;
		name: string;
	}

	interface FilterData {
		colors: { uid: string; name: string }[];
		selectedColors: Set<string>;
		domains: Domain[];
		selectedDomain: string | null;
		appellations: Appellation[];
		selectedAppellation: string | null;
		priceRange: { min: number; max: number };
	}

	let isDomainSectionExpanded = true;
	let isAppellationSectionExpanded = true;
	let minPrice = 5;
	let maxPrice = 200;
	let leftValue: Writable<number> = spring(minPrice);
	let rightValue: Writable<number> = spring(maxPrice);

	const minGap = 15; // Minimum gap in percentage

	$: currentMinPrice = Math.round($leftValue);
	$: currentMaxPrice = Math.round($rightValue);

	export let filterData: FilterData = {
		colors: [],
		selectedColors: new Set(),
		domains: [],
		selectedDomain: null,
		appellations: [],
		selectedAppellation: null,
		priceRange: { min: minPrice, max: maxPrice }
	};
	export let handleFilterChange: (
		filterType: 'color' | 'domain' | 'appellation' | 'prix',
		value: string | { min: number; max: number } | Set<string>
	) => void = () => {};
	export let appellationNames: Record<string, string> = {};
	export const getWinesByAppellation: (appellationUid: string) => any[] = () => [];
	export let regionAppellations: Appellation[] = [];
	export let selectedAppellationUid: string | null = null;

	function toggleDomainSection() {
		isDomainSectionExpanded = !isDomainSectionExpanded;
	}

	function toggleAppellationSection() {
		isAppellationSectionExpanded = !isAppellationSectionExpanded;
	}

	function handleLeftChange(event: Event): void {
		let value = parseFloat((event.target as HTMLInputElement).value);
		let rightValuePercentage = (($rightValue - minPrice) / (maxPrice - minPrice)) * 100;
		let maxLeftValuePercentage = rightValuePercentage - minGap;
		let maxLeftValue = (maxLeftValuePercentage / 100) * (maxPrice - minPrice) + minPrice;

		if (value > maxLeftValue) {
			value = maxLeftValue;
			const target = event.target as HTMLInputElement;
			target.value = String(value);
		}
		leftValue.set(value);
		handleFilterChange('prix', { min: Math.round(value), max: currentMaxPrice });
	}

	function handleRightChange(event: Event): void {
		let value = parseFloat((event.target as HTMLInputElement).value);
		let leftValuePercentage = (($leftValue - minPrice) / (maxPrice - minPrice)) * 100;
		let minRightValuePercentage = leftValuePercentage + minGap;
		let minRightValue = (minRightValuePercentage / 100) * (maxPrice - minPrice) + minPrice;

		if (value < minRightValue) {
			value = minRightValue;
			const target = event.target as HTMLInputElement;
			target.value = String(value);
		}
		rightValue.set(value);
		handleFilterChange('prix', { min: currentMinPrice, max: Math.round(value) });
	}

	function calculatePosition(value: number): number {
		return ((value - minPrice) / (maxPrice - minPrice)) * 100;
	}

	$: leftPosition = calculatePosition($leftValue);
	$: rightPosition = calculatePosition($rightValue);

	$: leftLabelOffset = (14 / sliderWidth) * 100;

	let sliderWidth = 1; // Default to 1 to avoid division by zero

	function handleResize() {
		const slider = document.querySelector('.slider-container') as HTMLElement;
		if (slider) {
			sliderWidth = slider.offsetWidth;
		}
	}

	import { onMount } from 'svelte';

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	function localHandleFilterChange(
		filterType: 'color' | 'domain' | 'appellation' | 'prix',
		value: string | { min: number; max: number }
	): void {
		try {
			if (filterType === 'color' && typeof value === 'string') {
				if (filterData.selectedColors.has(value)) {
					filterData.selectedColors.delete(value);
				} else {
					filterData.selectedColors.add(value);
				}
				filterData.selectedColors = new Set(filterData.selectedColors);
				handleFilterChange(filterType, filterData.selectedColors);
			} else if (filterType === 'domain' && typeof value === 'string') {
				filterData.selectedDomain = filterData.selectedDomain === value ? null : value;
				handleFilterChange(filterType, filterData.selectedDomain || '');
			} else if (filterType === 'appellation' && typeof value === 'string') {
				// Ne rien faire ici, le toggle est géré directement dans le template
			} else {
				handleFilterChange(filterType, value);
			}
		} catch (error) {
			console.error('Error in localHandleFilterChange:', error);
		}
	}

	function generateAppellationWordCloud(): void {
		try {
			if (!filterData.selectedDomain || !filterData.domains) {
				filterData.appellations = [];
				return;
			}

			const selectedDomain = filterData.domains.find(
				(domain: Domain) => domain.uid === filterData.selectedDomain
			);

			if (selectedDomain && selectedDomain.appellations) {
				const uniqueAppellations = new Set(
					selectedDomain.appellations.map((appellation: Appellation) => appellation.uid)
				);
				filterData.appellations = Array.from(uniqueAppellations)
					.map((uid: string) => {
						const appellation = selectedDomain.appellations.find((a: Appellation) => a.uid === uid);
						return appellation;
					})
					.filter(Boolean) as Appellation[];
			} else {
				filterData.appellations = [];
			}
		} catch (error) {
			console.error('Error in generateAppellationWordCloud:', error);
			filterData.appellations = [];
		}
	}
</script>

<aside class="bg-gray-100 md:w-1/4">
	<!-- Appellation Section -->
	<div class="mb-6 border-t border-primary">
		<button
			class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
			on:click={toggleAppellationSection}
			aria-expanded={isAppellationSectionExpanded}
			aria-controls="appellation-list"
		>
			NOS VINS PAR APPELLATIONS
			<ArrowIcon isSelected={isAppellationSectionExpanded} class="ml-2" />
		</button>

		<div id="appellation-list" class={isAppellationSectionExpanded ? '' : 'hidden'}>
			{#if regionAppellations && regionAppellations.length > 0}
				<div class="word-cloud">
					{#each regionAppellations as appellation (appellation.uid)}
						<button
							type="button"
							class="appellation-word flex items-center justify-between gap-2 text-left no-underline transition-colors hover:no-underline"
							style="font-weight: {selectedAppellationUid === appellation.uid
								? 'bold'
								: 'normal'}; color: {selectedAppellationUid === appellation.uid
								? 'var(--primary)'
								: selectedAppellationUid
									? '#9ca3af'
									: 'inherit'};"
							on:click={() => {
								// Toggle direct pour que bind: fonctionne
								if (selectedAppellationUid === appellation.uid) {
									selectedAppellationUid = null;
								} else {
									selectedAppellationUid = appellation.uid;
								}
							}}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									if (selectedAppellationUid === appellation.uid) {
										selectedAppellationUid = null;
									} else {
										selectedAppellationUid = appellation.uid;
									}
								}
							}}
							aria-pressed={selectedAppellationUid === appellation.uid}
							aria-label={`Appellation ${appellationNames[appellation.uid] || appellation.name || 'Nom inconnu'}`}
						>
							<span>{appellationNames[appellation.uid] || appellation.name || 'Nom inconnu'}</span>
							{#if selectedAppellationUid === appellation.uid}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 flex-shrink-0"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</button>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 text-sm">Aucune appellation disponible pour cette région</p>
			{/if}
		</div>
	</div>
	<!-- Domain Section -->
	<div class="mb-6 border-t border-primary">
		<button
			class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
			on:click={toggleDomainSection}
			aria-expanded={isDomainSectionExpanded}
			aria-controls="domain-list"
		>
			NOS VINS PAR DOMAINES
			<ArrowIcon isSelected={isDomainSectionExpanded} class="ml-2" />
		</button>

		<div id="domain-list" class={isDomainSectionExpanded ? '' : 'hidden'}>
			{#if filterData?.domains && filterData.domains.length > 0}
				{#each filterData.domains as domain (domain.uid)}
					<div class="mb-2">
						<label
							class="block {filterData.selectedDomain === domain.uid
								? 'cursor-default'
								: 'cursor-pointer hover:underline'} focus:no-underline"
						>
							<input
								type="radio"
								name="domain"
								value={domain.uid}
								checked={filterData.selectedDomain === domain.uid}
								on:change={() => localHandleFilterChange('domain', domain.uid)}
								class="hidden"
								aria-label={`Domaine ${domain.name || 'Nom non défini'}`}
							/>
							<div class="flex items-center justify-between font-light">
								<span
									class="{filterData.selectedDomain === domain.uid
										? 'font-bold'
										: ''} hover:text-gray-700"
								>
									{domain.name || 'Nom non défini'}
								</span>
							</div>
						</label>
					</div>
				{/each}
			{:else}
				<p class="text-gray-500 text-sm">Aucun domaine disponible</p>
			{/if}
		</div>
	</div>

	<!-- New Price Range Filter -->
	<div class="border-black mb-6 border-t">
		<h3 class="mt-2 text-xl uppercase">Prix</h3>
		<div class="relative pb-2 pt-10">
			<div class="slider-container relative h-[2px] w-full">
				<div class="bg-gray-300 absolute left-0 right-0 top-0 h-full"></div>
				<div
					class="absolute top-0 h-full bg-primary"
					style="left: {leftPosition}%; right: {100 - rightPosition}%;"
				></div>
				<div class="absolute left-0 right-0 top-[-32px]">
					<span
						class="absolute whitespace-nowrap text-sm"
						style="left: calc({leftPosition}% + {leftLabelOffset}%); transform: translateX(-50%);"
					>
						{currentMinPrice}€
					</span>
					<span
						class="absolute whitespace-nowrap text-sm"
						style="left: {rightPosition}%; transform: translateX(-50%);"
					>
						{currentMaxPrice}€
					</span>
				</div>
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					step="1"
					bind:value={$leftValue}
					on:input={handleLeftChange}
					class="range-input"
					aria-label="Prix minimum"
				/>
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					step="1"
					bind:value={$rightValue}
					on:input={handleRightChange}
					class="range-input"
					aria-label="Prix maximum"
				/>
			</div>
		</div>
	</div>

	<div class="mb-6 border-t border-primary">
		<h3 class="mb-2 mt-2 text-xl uppercase">Couleurs</h3>
		<div class="grid grid-cols-3 gap-x-2 gap-y-4">
			{#if filterData?.colors && filterData.colors.length > 0}
				{#each filterData.colors as color (color.uid)}
					<label class="flex cursor-pointer items-center font-light">
						<input
							type="checkbox"
							value={color.uid}
							checked={filterData.selectedColors.has(color.uid)}
							on:change={() => localHandleFilterChange('color', color.uid)}
							class="sr-only"
							aria-label={`Couleur ${color.name || 'Nom non défini'}`}
						/>
						<div class="border-gray-300 relative mr-2 h-[17px] w-[17px] flex-shrink-0 border">
							{#if filterData.selectedColors.has(color.uid)}
								<div class="absolute inset-0 m-[2px] bg-primary"></div>
							{/if}
						</div>
						<span class="truncate">{color.name || 'Nom non défini'}</span>
					</label>
				{/each}
			{:else}
				<p class="text-gray-500 text-sm">Aucune couleur disponible</p>
			{/if}
		</div>
	</div>
</aside>

<style>
	.range-input {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 2px;
		appearance: none;
		background: transparent;
		pointer-events: none;
	}

	.range-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: black;
		cursor: pointer;
		pointer-events: auto;
		margin-top: -7px; /* (16px height - 2px line height) / 2 */
	}

	.range-input::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: black;
		cursor: pointer;
		pointer-events: auto;
		margin-top: -7px; /* (16px height - 2px line height) / 2 */
	}

	.range-input::-webkit-slider-runnable-track {
		background: transparent;
		height: 2px;
	}

	.range-input::-moz-range-track {
		background: transparent;
		height: 2px;
	}

	.word-cloud {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.appellation-word {
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
		font: inherit;
	}
	.appellation-word:hover {
		text-decoration: none;
	}
</style>
