<script>
	import { SliceZone, PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import { page } from '$app/stores';
	import Socials from '$lib/components//Socials.svelte';
	import VinCard from '$lib/components/vin/VinCard.svelte';
	import { components } from '$lib/slices';

	export let data;
</script>

<div class="container mt-12">
	<div class="ml-12 font-sofia text-xl font-normal">
		<div class="font-span text-4xl font-bold">{data.domaine}</div>
		<PrismicRichText field={data.page.data.title} />
	</div>

	<VinCard {data} />

	<SliceZone slices={data.page.data.slices} {components} />

	<Socials settings={$page.data.settings} />
</div>
