<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { RegionDocument, CouleurDocument, CategoriesDocument } from '../../prismicio-types';
	import FooterMobile from './footer/FooterMobile.svelte';
	import FooterDesktop from './footer/FooterDesktop.svelte';
	import FooterAside from './footer/FooterAside.svelte';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let categories: CategoriesDocument[] = [];
</script>

<footer class="relative flex flex-col md:flex-row">
	<!-- Section principale avec colonnes - fond bordeaux avec texte blanc -->
	<div
		class="footer-content w-full bg-[#3b0d0c] px-6 pt-12 max-sm:pb-4 md:px-12 md:py-12 md:pr-[520px]"
	>
		<FooterMobile {settings} {regions} />
		<FooterDesktop {settings} {regions} />
	</div>

	<FooterAside {settings} />
</footer>

<style>
	/* Forcer le texte en blanc dans la section bordeaux */
	.footer-content {
		color: white !important;
	}
</style>
