<script lang="ts">
	import '../app.css';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/state';
	import { repositoryName } from '$lib/prismicio';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: any;

	// Variables réactives globales pour la navigation
	$: currentPath = page.url.pathname;

	// Fonction helper exportée globalement pour vérifier les liens actifs
	export const isActiveLink = (path: string) => {
		if (!path) return false;

		// Pour la page d'accueil
		if (path === '/' && currentPath === '/') {
			return true;
		}

		// Pour les autres pages
		if (path !== '/' && currentPath.startsWith(path)) {
			return true;
		}

		return false;
	};
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
	<title>{page.data.title}</title>
	{#if page.data.meta_description}
		<meta name="description" content={page.data.meta_description} />
	{/if}
	{#if page.data.meta_title}
		<meta name="og:title" content={page.data.meta_title} />
	{/if}
	{#if page.data.meta_image}
		<meta name="og:image" content={page.data.meta_image.url} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<Header settings={data.settings} regions={data.regions} colors={data.colors} />
<main>
	<slot />
</main>
<Footer
	settings={data.settings}
	regions={data.regions}
	colors={data.colors}
	categories={data.categories}
/>

<PrismicPreview {repositoryName} />
