<script>
	import { createEventDispatcher } from 'svelte';
	export let colors = [];
	export let selectedColor = null;

	const dispatch = createEventDispatcher();

	function handleColorChange(event) {
		const colorUid = event.target.value;
		dispatch('filterChange', { type: 'selectedColor', value: colorUid });
	}
</script>

<div class="mb-6 border-t border-primary">
	<h3 class="mb-2 mt-2 text-xl uppercase">Couleurs</h3>
	{#each colors as color}
		<label class="mb-2 flex cursor-pointer items-center font-light">
			<input
				type="checkbox"
				value={color.uid}
				checked={selectedColor === color.uid}
				on:change={handleColorChange}
				class="mr-2"
			/>
			{color.name}
		</label>
	{/each}
</div>
