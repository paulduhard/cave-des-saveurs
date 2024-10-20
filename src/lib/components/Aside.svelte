<script lang="ts">
	import ArrowIcon from './ArrowIcon.svelte';
	import { spring } from 'svelte/motion';

	let isDomainSectionExpanded = true;
	let minPrice = 5;
	let maxPrice = 200;
	let leftValue = spring(minPrice);
	let rightValue = spring(maxPrice);

	const minGap = 15; // Minimum gap in percentage

	$: currentMinPrice = Math.round($leftValue);
	$: currentMaxPrice = Math.round($rightValue);

	export let filterData = {
		colors: [],
		selectedColor: null,
		domains: [],
		selectedDomain: null,
		appellations: [],
		displayedAppellations: [],
		priceRange: { min: minPrice, max: maxPrice }
	};
	export let handleFilterChange: (filterType: string, value: any) => void;
	export let appellationNames = {};

	function toggleDomainSection() {
		isDomainSectionExpanded = !isDomainSectionExpanded;
	}

	function handleLeftChange(event) {
		let value = parseFloat(event.target.value);
		let rightValuePercentage = (($rightValue - minPrice) / (maxPrice - minPrice)) * 100;
		let maxLeftValuePercentage = rightValuePercentage - minGap;
		let maxLeftValue = (maxLeftValuePercentage / 100) * (maxPrice - minPrice) + minPrice;

		if (value > maxLeftValue) {
			value = maxLeftValue;
			event.target.value = value;
		}
		leftValue.set(value);
		handleFilterChange('prix', { min: Math.round(value), max: currentMaxPrice });
	}

	function handleRightChange(event) {
		let value = parseFloat(event.target.value);
		let leftValuePercentage = (($leftValue - minPrice) / (maxPrice - minPrice)) * 100;
		let minRightValuePercentage = leftValuePercentage + minGap;
		let minRightValue = (minRightValuePercentage / 100) * (maxPrice - minPrice) + minPrice;

		if (value < minRightValue) {
			value = minRightValue;
			event.target.value = value;
		}
		rightValue.set(value);
		handleFilterChange('prix', { min: currentMinPrice, max: Math.round(value) });
	}

	function calculatePosition(value) {
		return ((value - minPrice) / (maxPrice - minPrice)) * 100;
	}

	$: leftPosition = calculatePosition($leftValue);
	$: rightPosition = calculatePosition($rightValue);

	$: leftLabelOffset = (14 / sliderWidth) * 100;

	let sliderWidth = 1; // Default to 1 to avoid division by zero

	function handleResize() {
		const slider = document.querySelector('.slider-container');
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

	function localHandleFilterChange(filterType: string, value: any) {
		if (filterType === 'color') {
			if (filterData.selectedColors.has(value)) {
				filterData.selectedColors.delete(value);
			} else {
				filterData.selectedColors.add(value);
			}
			handleFilterChange(filterType, new Set(filterData.selectedColors));
		} else if (filterType === 'domain') {
			if (filterData.selectedDomain === value) {
				// Si le même domaine est cliqué à nouveau, réinitialiser l'appellation
				filterData.selectedAppellation = null;
			}
			handleFilterChange(filterType, value);
		} else {
			handleFilterChange(filterType, value);
		}
	}
</script>

<aside class="bg-gray-100 w-1/4">
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
			{#if filterData.domains && filterData.domains.length > 0}
				{#each filterData.domains as domain}
					<div class="mb-2">
						<label class="block cursor-pointer hover:underline focus:no-underline">
							<input
								type="radio"
								name="domain"
								value={domain.uid}
								checked={filterData.selectedDomain === domain.uid}
								on:change={() => localHandleFilterChange('domain', domain.uid)}
								class="hidden"
							/>
							<div class="flex items-center justify-between font-light">
								<span
									class="{filterData.selectedDomain === domain.uid
										? 'font-bold'
										: ''} hover:text-gray-700"
								>
									{domain.name}
								</span>
								<ArrowIcon isSelected={filterData.selectedDomain === domain.uid} class="ml-2" />
							</div>
						</label>

						{#if filterData.selectedDomain === domain.uid && filterData.displayedAppellations.length > 0}
							<ul class="ml-6 mt-2 pl-2 text-sm">
								{#each filterData.displayedAppellations as appellation}
									<li>
										<button
											class="text-left hover:underline {filterData.selectedAppellation ===
											appellation.uid
												? 'font-bold'
												: ''}"
											on:click={() => localHandleFilterChange('appellation', appellation.uid)}
										>
											{appellationNames[appellation.uid] || 'Nom inconnu'}
										</button>
									</li>
								{/each}
							</ul>
						{:else if filterData.selectedDomain === domain.uid}
							<p class="ml-4 mt-2 text-sm italic">Aucune appellation trouvée</p>
						{/if}
					</div>
				{/each}
			{:else}
				<p>Aucun domaine disponible</p>
			{/if}
		</div>
	</div>

	<!-- New Price Range Filter -->
	<div class="border-black mb-6 border-t">
		<h3 class="mb-2 mt-2 text-xl uppercase">Prix</h3>
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
				/>
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					step="1"
					bind:value={$rightValue}
					on:input={handleRightChange}
					class="range-input"
				/>
			</div>
		</div>
	</div>

	<div class="mb-6 border-t border-primary">
		<h3 class="mb-2 mt-2 text-xl uppercase">Couleurs</h3>
		{#each filterData.colors as color}
			<label class="mb-2 flex cursor-pointer items-center font-light">
				<input
					type="checkbox"
					value={color.uid}
					checked={filterData.selectedColor === color.uid}
					on:change={() => localHandleFilterChange('color', color.uid)}
					class="mr-2"
				/>
				{color.name}
			</label>
		{/each}
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
</style>
