<script>
	import { spring } from 'svelte/motion';
	import { createEventDispatcher, onMount } from 'svelte';

	export let minPrice = 5;
	export let maxPrice = 200;

	let leftValue = spring(minPrice);
	let rightValue = spring(maxPrice);

	const minGap = 15.33; // Minimum gap in percentage

	$: currentMinPrice = Math.round($leftValue);
	$: currentMaxPrice = Math.round($rightValue);

	const dispatch = createEventDispatcher();

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
		dispatch('filterChange', {
			type: 'price',
			value: { min: Math.round(value), max: currentMaxPrice }
		});
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
		dispatch('filterChange', {
			type: 'price',
			value: { min: currentMinPrice, max: Math.round(value) }
		});
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

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

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
		margin-top: -7px;
	}

	.range-input::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: black;
		cursor: pointer;
		pointer-events: auto;
		margin-top: -7px;
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
