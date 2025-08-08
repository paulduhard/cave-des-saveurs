<script lang="ts">
	import { PrismicRichText, PrismicEmbed } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import type { Content } from '@prismicio/client';

	export let slice: Content.LocationContactInfoSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container flex flex-col items-center gap-8 py-14 md:flex-row"
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
	<div class="w-full space-y-2 md:w-1/2">
		<div class="w-fit space-y-2 border-b-[.5px] pb-4">
			<!-- Location Title -->
			<p class="text-2xl">
				{slice.primary.location_title}
			</p>

			<!-- Address -->
			<p>
				{slice.primary.address}
			</p>
		</div>

		<div class="w-fit space-y-2 border-b-[.5px] py-4">
			<!-- Contact Title -->
			<p class="text-2xl">
				{slice.primary.contact_title}
			</p>

			<!-- Contact Methods -->
			<div class="space-y-2">
				{#each slice.primary.contact_methods as method}
					<div>
						{method.value}
					</div>
				{/each}
			</div>
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
