<script>
	import { SliceZone, PrismicImage, PrismicRichText } from '@prismicio/svelte';

	import { components } from '$lib/slices';

	export let data;
</script>

<PrismicRichText field={data.page.data.title} />

<div class="flex flex-col items-center justify-center md:flex-row">
	<PrismicImage field={data.page.data.image} />

	<div>
		<div>RÉGION :</div>
		<div>APPELLATION :</div>
		<div>TERROIR : {data.page.data.terroir}</div>
		<div>COULEUR :</div>
		<div>
			CÉPAGE(S) :
			{data.page.data.cepages}
		</div>
		<div>À L'OEIL : {data.page.data.oeil}</div>
		<div>AU NEZ : {data.page.data.nez}</div>
		<div>EN BOUCHE : {data.page.data.bouche}</div>
		<div class="flex">SE DÉGUSTE AVEC : <PrismicRichText field={data.page.data.degustation} /></div>

		<div class="bg-gray-500 my-8 flex w-[542px] flex-col gap-4 py-6">
			<div class="px-22 text-center text-[15px] tracking-tight">
				Chez nous, tout se passe en boutique ! Nous vous invitons à nous contacter par téléphone ou
				mail pour passer commande.
			</div>
			<div class="flex justify-center gap-8">
				<div class="border px-6 py-2">04 90 47 11 81</div>
				<div class="border px-6 py-2">contact@cave-des-saveurs.com</div>
			</div>
		</div>
	</div>
</div>

<SliceZone slices={data.page.data.slices} {components} />
