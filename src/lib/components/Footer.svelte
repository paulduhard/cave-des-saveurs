<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components as allSlices } from '../slices';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument, CouleurDocument, CategoriesDocument } from '../../prismicio-types';
	import FooterMobile from './footer/FooterMobile.svelte';
	import FooterDesktop from './footer/FooterDesktop.svelte';
	import FooterAside from './footer/FooterAside.svelte';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let categories: CategoriesDocument[] = [];
	export let alcoolTypes: string[] = [];

	// Filtrer les slices pour n'afficher que la slice NewsletterSignup dans le footer
	const footerSlices = settings.data.slices4.filter(
		(slice) => slice.slice_type === 'newsletter_signup'
	);
</script>

<!-- Slice Zone for footer slices, such as the newsletter -->
<SliceZone slices={footerSlices} components={allSlices} />
<footer class="relative flex flex-col md:flex-row">
	<!-- Section principale avec colonnes - fond bordeaux avec texte blanc -->
	<div
		class="footer-content w-full bg-[#3b0d0c] px-6 pt-12 max-sm:pb-4 md:px-12 md:py-12 md:pr-[520px]"
	>
		<FooterMobile {settings} {regions} {alcoolTypes} />
		<FooterDesktop {settings} {regions} {alcoolTypes} />
	</div>

	<FooterAside {settings} />
</footer>

<style>
	/* Forcer le texte en blanc dans la section bordeaux */
	.footer-content {
		color: white !important;
	}
</style>
