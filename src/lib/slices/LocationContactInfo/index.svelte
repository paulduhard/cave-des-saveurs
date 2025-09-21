<script lang="ts">
	import { PrismicRichText, PrismicEmbed } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.LocationContactInfoSlice;

	// Function to determine the appropriate href attribute based on method type
	function getContactHref(method: any): string {
		switch (method.method_type) {
			case 'phone':
				return `tel:${method.value.replace(/\s+/g, '')}`;
			case 'email':
				return `mailto:${method.value}`;
			default:
				return '#';
		}
	}

	// Function to determine the appropriate icon based on method type
	function getContactIcon(method: any): string {
		switch (method.method_type) {
			case 'phone':
				return '';
			case 'email':
				return '';
			default:
				return '';
		}
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="container flex flex-col items-center gap-8 py-14 md:flex-row"
>
	<!-- Map Section -->
	<div class="w-full md:w-2/3">
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
	<div class="w-full space-y-2 text-center md:w-1/3 md:text-left">
		<div class="mx-auto w-[250px] space-y-2 border-b-[.5px] pb-4 md:mx-0">
			<!-- Location Title -->
			<p class="text-2xl">
				{slice.primary.location_title}
			</p>

			<!-- Address -->
			<a
				href="https://maps.app.goo.gl/rpboHrYd2ha9ouip8"
				target="_blank"
				rel="noopener"
				class="text-sm transition-colors duration-200 hover:underline"
			>
				{slice.primary.address}
			</a>
		</div>

		<div class="mx-auto w-[250px] space-y-2 border-b-[.5px] py-4 md:mx-0">
			<!-- Contact Title -->
			<p class="text-2xl">
				{slice.primary.contact_title}
			</p>

			<!-- Contact Methods -->
			<div class="space-y-2">
				{#each slice.primary.contact_methods as method}
					<div class="flex items-center justify-center gap-2 md:justify-start">
						<span class="text-lg">{getContactIcon(method)}</span>
						{#if method.method_type === 'other'}
							<a
								href={getContactHref(method)}
								class="transition-colors duration-200 hover:underline"
								rel="noopener"
							>
								{method.value}
							</a>
						{:else}
							<a
								href={getContactHref(method)}
								class="transition-colors duration-200 hover:underline"
							>
								{method.value}
							</a>
						{/if}
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
