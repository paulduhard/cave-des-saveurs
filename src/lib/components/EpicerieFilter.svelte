<script lang="ts">
	import ArrowIcon from './ArrowIcon.svelte';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	interface Region {
		uid: string;
		data: { region: string };
	}

	interface FilterData {
		types: { value: string; label: string }[];
		selectedType: string | null;
		regions: Region[];
		selectedRegion: string | null;
		priceRange: { min: number; max: number };
	}

	let isTypeSectionExpanded = true;
	let isRegionSectionExpanded = true;
	let isPriceSectionExpanded = true;
	let minPrice = 5;
	let maxPrice = 120;
	let leftValue = spring(minPrice);
	let rightValue = spring(maxPrice);

	const minGap = 15;

	$: currentMinPrice = Math.round($leftValue);
	$: currentMaxPrice = Math.round($rightValue);

	export let filterData: FilterData = {
		types: [],
		selectedType: null,
		regions: [],
		selectedRegion: null,
		priceRange: { min: minPrice, max: maxPrice }
	};

	export let handleFilterChange: (
		filterType: 'type' | 'region' | 'prix',
		value: string | { min: number; max: number } | null
	) => void = () => {};

	function toggleTypeSection() {
		isTypeSectionExpanded = !isTypeSectionExpanded;
	}

	function toggleRegionSection() {
		isRegionSectionExpanded = !isRegionSectionExpanded;
	}

	function togglePriceSection() {
		isPriceSectionExpanded = !isPriceSectionExpanded;
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

	let sliderWidth = 1;

	function handleResize() {
		const slider = document.querySelector('.slider-container') as HTMLElement;
		if (slider) {
			sliderWidth = slider.offsetWidth;
		}
	}

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<aside class="bg-gray-100md:w-1/4">
	<!-- Type Section -->
	<div class="mb-6 border-t border-primary">
		<button
			class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
			on:click={toggleTypeSection}
			aria-expanded={isTypeSectionExpanded}
			aria-controls="type-list"
		>
			Type de produit
			<ArrowIcon isSelected={isTypeSectionExpanded} class="ml-2" />
		</button>

		<div id="type-list" class={isTypeSectionExpanded ? '' : 'hidden'}>
			{#if filterData?.types && filterData.types.length > 0}
				<div class="word-cloud">
					{#each filterData.types as type (type.value)}
						<button
							type="button"
							class="appellation-word flex items-center justify-between gap-2 text-left no-underline transition-colors hover:no-underline"
							style="font-weight: {filterData.selectedType === type.value
								? 'bold'
								: 'normal'}; color: {filterData.selectedType === type.value
								? 'var(--primary)'
								: filterData.selectedType
									? '#9ca3af'
									: 'inherit'};"
							on:click={() => {
								if (filterData.selectedType === type.value) {
									filterData.selectedType = null;
									handleFilterChange('type', null);
								} else {
									filterData.selectedType = type.value;
									handleFilterChange('type', type.value);
								}
							}}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									if (filterData.selectedType === type.value) {
										filterData.selectedType = null;
										handleFilterChange('type', null);
									} else {
										filterData.selectedType = type.value;
										handleFilterChange('type', type.value);
									}
								}
							}}
							aria-pressed={filterData.selectedType === type.value}
							aria-label={`Type ${type.label}`}
						>
							<span>{type.label}</span>
							{#if filterData.selectedType === type.value}
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
				<p class="text-gray-500 text-sm">Aucun type disponible</p>
			{/if}
		</div>
	</div>

	<!-- Region Section -->
	<div class="mb-6 border-t border-primary">
		<button
			class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
			on:click={toggleRegionSection}
			aria-expanded={isRegionSectionExpanded}
			aria-controls="region-list"
		>
			Région
			<ArrowIcon isSelected={isRegionSectionExpanded} class="ml-2" />
		</button>

		<div id="region-list" class={isRegionSectionExpanded ? '' : 'hidden'}>
			{#if filterData?.regions && filterData.regions.length > 0}
				<div class="word-cloud">
					{#each filterData.regions as region (region.uid)}
						<button
							type="button"
							class="appellation-word flex items-center justify-between gap-2 text-left no-underline transition-colors hover:no-underline"
							style="font-weight: {filterData.selectedRegion === region.uid
								? 'bold'
								: 'normal'}; color: {filterData.selectedRegion === region.uid
								? 'var(--primary)'
								: filterData.selectedRegion
									? '#9ca3af'
									: 'inherit'};"
							on:click={() => {
								if (filterData.selectedRegion === region.uid) {
									filterData.selectedRegion = null;
									handleFilterChange('region', null);
								} else {
									filterData.selectedRegion = region.uid;
									handleFilterChange('region', region.uid);
								}
							}}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									if (filterData.selectedRegion === region.uid) {
										filterData.selectedRegion = null;
										handleFilterChange('region', null);
									} else {
										filterData.selectedRegion = region.uid;
										handleFilterChange('region', region.uid);
									}
								}
							}}
							aria-pressed={filterData.selectedRegion === region.uid}
						aria-label={`Région ${region.data.region}`}
					>
						<span>{region.data.region}</span>
							{#if filterData.selectedRegion === region.uid}
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
				<p class="text-gray-500 text-sm">Aucune région disponible</p>
			{/if}
		</div>
	</div>

	<!-- Price Range Filter -->
	<div class="border-black mb-6 border-t">
		<button
			class="mb-2 mt-4 flex w-full items-center justify-between text-left text-xl uppercase"
			on:click={togglePriceSection}
			aria-expanded={isPriceSectionExpanded}
			aria-controls="price-list"
		>
			Prix
			<ArrowIcon isSelected={isPriceSectionExpanded} class="ml-2" />
		</button>
		<div id="price-list" class={isPriceSectionExpanded ? 'relative pb-2 pt-10' : 'hidden'}>
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