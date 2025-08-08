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
		class="footer-content w-full bg-[#3b0d0c] px-6 pt-12 max-sm:pb-4 md:px-12 md:py-12 md:pr-[420px]"
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

	.footer-content * {
		color: white !important;
	}

	.footer-content h3,
	.footer-content h4,
	.footer-content p,
	.footer-content li,
	.footer-content a {
		color: white !important;
	}

	/* Hover effect pour les liens */
	.footer-content a:hover {
		color: #d1d5db !important;
	}
</style>
