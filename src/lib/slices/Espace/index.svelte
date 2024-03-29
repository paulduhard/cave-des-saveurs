<script>
	/** @type {import("@prismicio/client").Content.SpacerSlice} */
	export let slice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	{#if slice.primary.size == 'Petit'}
    <div class="h-8"></div>
	{:else if slice.primary.size == 'Moyen'}
		<div class="h-16"></div>
	{:else if slice.primary.size == 'Grand'}
		<div class="h-32"></div>
	{/if}

</section>
