<script lang="ts">
	import { PrismicRichText, PrismicEmbed } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import type { Content } from '@prismicio/client';

	export let slice: Content.LocationContactInfoSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="flex flex-col items-center gap-8 py-8 md:flex-row"
>
	<!-- Map Section -->
	<div class="w-full md:w-1/2">
		<div class="aspect-w-16 aspect-h-9 map-embed">
			{#if slice.primary.map_iframe}
				<div class="map-embed">
					<iframe
						src={slice.primary.map_iframe}
						style="border:0;"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Carte Google Maps de La Cave des Saveurs"
					></iframe>
				</div>
			{/if}
		</div>
	</div>

	<!-- Contact Information Section -->
	<div class="w-full space-y-6 md:w-1/2">
		<!-- Location Title -->
		<h2 class="text-2xl font-bold">
			{slice.primary.location_title}
		</h2>

		<!-- Address -->
		<div class="space-y-2">
			<h3 class="font-semibold">Adresse</h3>
			<p>
				{slice.primary.address}
			</p>
		</div>

		<!-- Contact Title -->
		<h3 class="font-semibold">
			{slice.primary.contact_title}
		</h3>

		<!-- Contact Methods -->
		<div class="space-y-4">
			{#each slice.primary.contact_methods as method}
				<div class="flex items-center gap-2">
					<div>
						{method.value}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.map-embed {
		width: 100%;
		height: 100%;
	}

	.map-embed > iframe {
		width: 100%;
		aspect-ratio: 21/9;
	}

	section :global(a) {
		text-decoration: none;
		color: inherit;
	}

	section :global(a:hover) {
		text-decoration: underline;
	}
</style>
