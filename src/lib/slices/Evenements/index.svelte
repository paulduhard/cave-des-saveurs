<script>
	import { PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { isExternalLink } from '../../functions.js';

	/** @type {import("@prismicio/client").Content.BannerEventSlice} */
	export let slice;
</script>

{#if slice.variation === 'default'}
	<section
		data-slice-type={slice.slice_type}
		data-slice-variation={slice.variation}
		class="flex h-0 flex-col justify-center gap-4 bg-primary py-16 text-center md:flex-row md:items-center md:gap-6 md:py-8"
	>
		<div class="font-light md:text-xl">
			{#if isFilled.richText(slice.primary.text)}
				<PrismicRichText field={slice.primary.text} />
			{:else}
				<p class="text-gray-400">No content available</p>
			{/if}
		</div>
		<div class="text-sm font-thin tracking-wider">
			{#if isFilled.link(slice.primary.link)}
				{#if isExternalLink(slice.primary.link.url)}
					<PrismicLink
						field={slice.primary.link}
						class="group transition-all duration-700 hover:bg-secondary hover:text-primary"
					>
						{slice.primary.label}
						<img
							src="/assets/icone-external-link.svg"
							alt="lien externe"
							class="mb-1 ml-2 inline h-4 w-4 group-hover:filter-secondary"
						/>
					</PrismicLink>
				{:else}
					<PrismicLink
						field={slice.primary.link}
						class="transition-all duration-700 hover:bg-secondary hover:text-primary"
					>
						{slice.primary.label}
					</PrismicLink>
				{/if}
			{:else}
				<p class="text-gray-400">No link available</p>
			{/if}
		</div>
	</section>
{:else if slice.variation === 'bannerEventXl'}
	<section
		data-slice-type={slice.slice_type}
		data-slice-variation={slice.variation}
		class="flex flex-col justify-center gap-4 bg-primary py-7 text-center md:flex-row md:items-center md:gap-6 md:py-16"
	>
		<div class="font-light md:text-4xl">
			{#if isFilled.richText(slice.primary.text)}
				<PrismicRichText field={slice.primary.text} />
			{:else}
				<p class="text-gray-400">No content available</p>
			{/if}
		</div>
		<div class="mt-2 text-sm font-thin tracking-wider">
			{#if isFilled.link(slice.primary.link)}
				{#if isExternalLink(slice.primary.link.url)}
					<PrismicLink
						field={slice.primary.link}
						class="group transition-all duration-700 hover:bg-secondary hover:text-primary"
					>
						{slice.primary.label}
						<img
							src="/assets/icone-external-link.svg"
							alt="lien externe"
							class="mb-1 ml-2 inline h-4 w-4 transition-all duration-700 group-hover:filter-secondary"
						/>
					</PrismicLink>
				{:else}
					<PrismicLink field={slice.primary.link} class="hover:bg-secondary hover:text-primary">
						{slice.primary.label}
					</PrismicLink>
				{/if}
			{:else}
				<p class="text-gray-400">No link available</p>
			{/if}
		</div>
	</section>
{/if}

<style>
	section :global(p),
	section :global(a) {
		color: white;
	}
	section :global(a) {
		border: 0.5px solid white;
		padding: 0.3rem 2.5rem;
	}

	@media (min-width: 1280px) {
		section :global(a) {
			padding-inline: 3rem;
			padding-block: 0.3rem 0.5rem;
		}
	}
</style>
