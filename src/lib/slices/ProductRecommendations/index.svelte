<script lang="ts">
	import { isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import type { ProductRecommendationsSlice } from '../../../prismicio-types.d.ts';

	export let slice: ProductRecommendationsSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="bg-secondary pb-8"
>
	<div class="container mx-auto flex flex-col items-center justify-center px-4">
		<h2 class="my-8 w-full border-b-[.75px] border-primary border-b-primary pb-4 text-3xl">
			Les vins que vous aimerez
		</h2>

		{#if isFilled.group(slice.primary.products)}
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
				{#each slice.primary.products as product}
					{#if isFilled.contentRelationship(product.select_wine)}
						<div class="flex h-full w-fit flex-col font-light">
							<PrismicLink
								field={product.select_wine}
								class="flex flex-grow flex-col items-start border-b border-primary p-4 transition-shadow duration-300 ease-in-out hover:shadow-xl md:rounded-md md:border-none"
							>
								<div class="w-1/2 md:w-auto">
									{#if product.select_wine.data?.nouveaute}
										<span class="mb-2 inline-block py-1 text-lg font-semibold text-primary"
											>NOUVEAU !</span
										>
									{/if}
								</div>
								<div class="relative flex flex-row-reverse gap-8 md:flex-col">
									{#if isFilled.image(product.select_wine.data?.image)}
										<div class="w-1/2 md:w-auto">
											<PrismicImage field={product.select_wine.data.image} class="self-center" />
										</div>
									{:else}
										<div class="w-1/2 md:w-auto">
											<img src="/assets/placeholder.png" alt="" class="opacity-50" />
											<span
												class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl"
											>
												Photo à venir
											</span>
										</div>
									{/if}

									<div class="w-1/2 md:w-auto">
										{#if isFilled.richText(product.select_wine.data?.title)}
											<span class="font-span text-xl">
												<PrismicRichText field={product.select_wine.data.title} />
											</span>
										{/if}
										{#if isFilled.richText(product.select_wine.data?.resume)}
											<div class="mt-4 font-span">
												<PrismicRichText field={product.select_wine.data.resume} />
											</div>
										{/if}
									</div>
								</div>
								<div class="mt-auto pt-4">
									<span
										class="inline-block border border-primary px-8 py-2 font-light text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-secondary"
									>
										Découvrir
									</span>
								</div>
							</PrismicLink>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</section>
