<script lang="ts">
	import { PrismicImage } from '@prismicio/svelte';
	import { fade } from 'svelte/transition';
	export let product: any;
</script>

<div transition:fade={{ duration: 700 }} class="group flex h-full flex-col font-light">
	<!-- No <a> tag wrapper since we don't want links -->
	<div class="flex flex-grow flex-col items-start border-b border-primary p-4 transition-shadow duration-300 ease-in-out md:rounded-md md:border-none">
		<div class="flex flex-row-reverse md:flex-col">
			<div class="w-1/2 self-end md:w-auto">
				{#if product.image?.url}
					<PrismicImage field={product.image} class="self-center" />
				{:else}
					<div
						class="bg-red-200 relative flex h-full w-full items-center justify-center rounded-lg"
					>
						<img src="/assets/placeholder.png" alt="Image produit" class="opacity-50" />
						<span
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl"
						>
							Photo à venir
						</span>
					</div>
				{/if}
			</div>

			<div class="w-1/2 md:w-auto">
				<!-- Title with same styling as wine cards but without link -->
				<span class="mt-8 font-span font-medium">{product.titre}</span>
				
				<!-- Optional: Show type and region info like wine cards show domain -->
				{#if product.type}
					<span class="mb-2 font-span text-sm text-gray-600 block">{product.type}</span>
				{/if}
			</div>
		</div>
	</div>
</div>
