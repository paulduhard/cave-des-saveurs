<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	export let wine;

	function getWineUrl(wine: any) {
		return `/vin/${wine.uid}`;
	}
</script>

<div transition:fade={{ duration: 600 }} class="group flex h-full flex-col font-light">
	<a
		href={getWineUrl(wine)}
		class="duration-600 flex flex-grow flex-col items-start p-4 transition-shadow ease-in-out hover:shadow-lg"
	>
		<!-- <p>{getRegionByUID(wine.regionUID).region}</p> -->
		{#if wine.image.url}
			<PrismicImage field={wine.image} class="self-center" />
		{:else}
			<div class="bg-red-200 relative flex h-full w-full items-center justify-center rounded-lg">
				<img src="/assets/placeholder.png" alt="" class="opacity-50" />
				<span
					class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl"
				>
					Photo à venir
				</span>
			</div>
		{/if}

		<span class="mt-8 font-span"><PrismicRichText field={wine.title} /></span>
		<span class="mb-2 font-span text-xl">{wine.domaineName}</span>
		<PrismicRichText field={wine.resume} />

		<div class="mt-auto pt-4">
			<button
				class="duration-600 inline-block border border-primary px-8 py-2 font-light text-primary transition-all group-hover:bg-primary group-hover:text-secondary"
			>
				Découvrir
			</button>
		</div>
	</a>
</div>
