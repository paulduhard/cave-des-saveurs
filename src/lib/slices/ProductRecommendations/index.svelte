<script lang="ts">
	import { isFilled, asText } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import type { ProductRecommendationsSlice } from '../../../prismicio-types.d.ts';

	export let slice: ProductRecommendationsSlice;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="bg-secondary py-16 sm:px-16 md:px-48 lg:px-64"
>
	<div class="container flex flex-col items-center justify-center px-4">
		<h2 class="w-full border-b-[.75px] border-primary pb-4 text-3xl">Les vins que vous aimerez</h2>

		{#if isFilled.group(slice.primary.products)}
			<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
				{#each slice.primary.products as product}
					{#if isFilled.contentRelationship(product.select_wine)}
						<div class="flex h-full w-fit flex-col font-light">
							<PrismicLink
								field={product.select_wine}
								class="group flex flex-grow flex-col items-start border-b border-primary p-4 transition-shadow duration-300 ease-in-out hover:shadow-xl md:rounded-md md:border-none"
							>
								<div class="flex w-full flex-row-reverse gap-8 md:hidden">
									{#if isFilled.image(product.select_wine.data?.image)}
										<div class="relative flex w-1/2 items-center justify-center sm:h-44 sm:w-1/3">
											<div class="absolute -top-2 left-6 h-6 py-1">
												{#if product.select_wine.data?.nouveaute}
													<span class="inline-block text-sm font-semibold text-primary">
														NOUVEAU !
													</span>
												{/if}
											</div>
											<PrismicImage
												field={product.select_wine.data.image}
												class="mt-4 h-32 w-auto object-contain"
											/>
										</div>
									{:else}
										<div class="relative flex w-1/2 items-center justify-center sm:h-44 sm:w-1/3">
											<div class="absolute -top-2 left-6 h-6 py-1">
												{#if product.select_wine.data?.nouveaute}
													<span class="inline-block text-sm font-semibold text-primary">
														NOUVEAU !
													</span>
												{/if}
											</div>
											<div class="relative mt-4">
												<img
													src="/assets/placeholder.png"
													alt=""
													class="h-32 w-auto object-contain opacity-50"
												/>
												<span
													class="absolute left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-lg"
												>
													Photo à venir
												</span>
											</div>
										</div>
									{/if}

									<div class="flex w-1/2 flex-col sm:w-2/3 sm:justify-center">
										{#if isFilled.richText(product.select_wine.data?.title)}
											<h3 class="mb-4 font-span text-xl sm:mb-0 sm:leading-none">
												{asText(product.select_wine.data.title)}
											</h3>
										{/if}
										{#if isFilled.richText(product.select_wine.data?.resume)}
											<div class="mt-4 line-clamp-2 font-span text-sm">
												<PrismicRichText field={product.select_wine.data.resume} />
											</div>
										{/if}
										<div class="mt-auto pt-4 sm:mt-4 sm:pt-0">
											<span
												class="inline-block border border-primary px-6 py-2 text-sm font-light text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-secondary"
											>
												Découvrir
											</span>
										</div>
									</div>
								</div>

								<!-- Desktop: vertical layout -->
								<div class="hidden w-full flex-col md:flex">
									<div class="mb-4 h-8">
										{#if product.select_wine.data?.nouveaute}
											<span class="inline-block py-1 text-lg font-semibold text-primary">
												NOUVEAU !
											</span>
										{/if}
									</div>

									<div class="mb-6 flex justify-center">
										{#if isFilled.image(product.select_wine.data?.image)}
											<PrismicImage
												field={product.select_wine.data.image}
												class="h-48 w-auto self-center object-contain"
											/>
										{:else}
											<div class="relative">
												<img
													src="/assets/placeholder.png"
													alt=""
													class="h-48 w-auto object-contain opacity-50"
												/>
												<span
													class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform text-xl"
												>
													Photo à venir
												</span>
											</div>
										{/if}
									</div>

									{#if isFilled.richText(product.select_wine.data?.title)}
										<h3 class="font-span text-xl">
											{asText(product.select_wine.data.title)}
										</h3>
									{/if}

									{#if isFilled.richText(product.select_wine.data?.resume)}
										<div class="mb-6 line-clamp-2 font-span text-sm">
											<PrismicRichText field={product.select_wine.data.resume} />
										</div>
									{/if}

									<div class="mt-auto">
										<span
											class="inline-block border border-primary px-8 py-2 font-light text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-secondary"
										>
											Découvrir
										</span>
									</div>
								</div>
							</PrismicLink>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</section>
