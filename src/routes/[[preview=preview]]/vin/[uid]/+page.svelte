<script>
	import { SliceZone, PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import { page } from '$app/stores';
	import Socials from '$lib/components//Socials.svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<div class="mx-auto mt-12">
	<div class="ml-12 font-sofia text-xl font-normal">
		<div class="font-span text-4xl font-bold">{data.domaine}</div>
		<PrismicRichText field={data.page.data.title} />
	</div>

	<!-- Example of how to render tags
{#each data.page.tags as tag}
	<span class="text-xl">
		{tag}
	</span>
{/each} -->

	<div class="mb-20 flex flex-col items-center justify-center md:flex-row">
		<PrismicImage field={data.page.data.image} class="h-[490px] w-[380px]" />

		<div>
			<div class="text-primary">
				<div>RÉGION : <span class="font-light">{data.region}</span></div>
				<div>
					APPELLATION : <span class="font-light">{data.appellation}</span>
				</div>
				<div>TERROIR : <span class="font-light">{data.page.data.terroir}</span></div>
				<div>COULEUR : <span class="font-light">{data.couleur}</span></div>
				<div>
					CÉPAGE(S) :
					<span class="font-light">{data.page.data.cepages}</span>
				</div>
				<div>À L'OEIL : <span class="font-light">{data.page.data.oeil}</span></div>
				<div>AU NEZ : <span class="font-light">{data.page.data.nez}</span></div>
				<div>EN BOUCHE : <span class="font-light">{data.page.data.bouche}</span></div>
				<div class="flex">
					SE DÉGUSTE AVEC :&nbsp;
					<span class="font-light"><PrismicRichText field={data.page.data.degustation} /></span>
				</div>
			</div>

			<div class="my-8 flex w-[542px] flex-col gap-4 bg-secondary py-6">
				<div class="px-22 text-center text-[15px] tracking-tight">
					Chez nous, tout se passe en boutique ! Nous vous invitons à nous contacter par téléphone
					ou mail pour passer commande.
				</div>
				<div class="flex justify-center gap-8">
					<a
						href="tel:+33490471181"
						class=" border px-6 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
						>04 90 47 11 81</a
					>
					<a
						href="mailto:contact@cave-des-saveurs.com"
						class=" border border-primary px-6 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-secondary"
						>contact@cave-des-saveurs.com</a
					>
				</div>
			</div>
		</div>
	</div>

	<SliceZone slices={data.page.data.slices} {components} />

	<Socials settings={$page.data.settings} />
</div>
