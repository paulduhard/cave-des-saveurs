<script lang="ts">
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';
	import { fade } from 'svelte/transition';
	export let wine;
</script>

<div transition:fade={{ duration: 700 }} class="group flex h-full flex-col font-light">
	<a
		href={`/vin/${wine.uid}`}
		class="flex flex-grow flex-col items-start border-b border-primary p-4 transition-shadow duration-300 ease-in-out hover:shadow-xl md:rounded-md md:border-none"
	>
		<div class="flex flex-row-reverse md:flex-col">
			<div class="w-1/2 md:w-auto">
				{#if wine.image.url}
					<PrismicImage field={wine.image} class="self-center" />
				{:else}
					<div
						class="bg-red-200 relative flex h-full w-full items-center justify-center rounded-lg"
					>
						<img src="/assets/placeholder.png" alt="" class="opacity-50" />
						<span
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl"
						>
							Photo à venir
						</span>
					</div>
				{/if}
			</div>

			<div class="w-1/2 md:w-auto">
				<span class="mt-8 font-span"><PrismicRichText field={wine.title} /></span>
				<span class="mb-2 font-span text-xl">{wine.domaineName}</span>
				<PrismicRichText field={wine.resume} />

				<div class="mt-auto pt-4">
					<button
						class="inline-block border border-primary px-8 py-2 font-light text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-secondary"
					>
						Découvrir
					</button>
				</div>
			</div>
		</div>
	</a>
</div>
