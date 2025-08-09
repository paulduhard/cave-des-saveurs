<script lang="ts">
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { page } from '$app/state';
	import ExtLink from './ExtLink.svelte';
	import MegaMenu from './MegaMenu.svelte';
	import SearchIcon from './SearchIcon.svelte';
	import BurgerMenu from './BurgerMenu.svelte';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument, CouleurDocument } from '../../prismicio-types';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];

	let isMegaMenuVisible: boolean = false;
	let isBurgerMenuVisible: boolean = false;
	let closeMegaMenuTimeout: ReturnType<typeof setTimeout> | undefined;
	let megaMenuOpacity: number = 0;
	let isScrolled: boolean = false;

	function openMegaMenu() {
		if (closeMegaMenuTimeout) clearTimeout(closeMegaMenuTimeout);
		isMegaMenuVisible = true;
		megaMenuOpacity = 1;
	}

	function closeMegaMenu() {
		closeMegaMenuTimeout = setTimeout(() => {
			isMegaMenuVisible = false;
			megaMenuOpacity = 0;
		}, 300);
	}

	function toggleBurgerMenu() {
		isBurgerMenuVisible = !isBurgerMenuVisible;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 0;
	}

	// Variables réactives avec $app/state (SvelteKit 2.0+)
	$: currentPath = page.url.pathname;
	$: isCaveParentActive = currentPath.startsWith('/cave/');

	// Fonctions helper pour la navigation active - plus besoin de dérivés manuels
	export const isActiveLink = (navigationItem: any) => {
		if (!navigationItem.link?.url) return false;

		// Pour la page d'accueil
		if (navigationItem.link.url === '/' && currentPath === '/') {
			return true;
		}

		// Pour les autres pages
		if (navigationItem.link.url !== '/' && currentPath.startsWith(navigationItem.link.url)) {
			return true;
		}

		return false;
	};

	export const isRegionActive = (region: any) => {
		if (!region.uid) return false;
		const regionPath = region.uid === 'all' ? '/cave/all-wines' : `/cave/${region.uid}`;
		return currentPath === regionPath;
	};

	export const isColorActive = (color: any) => {
		if (!color.uid) return false;
		return currentPath === `/cave/${color.uid}`;
	};
</script>

<svelte:window on:scroll={handleScroll} />

<header
	class="sticky top-0 z-50 flex min-h-[85px] items-center justify-between gap-12 bg-secondary px-6 transition-all duration-300 hover:z-50 md:px-12 {isScrolled
		? 'shadow-md'
		: ''}"
>
	<a href="/"><PrismicImage field={settings.data.logo_header} /></a>
	<button class="block lg:hidden" on:click={toggleBurgerMenu}>
		<!-- Burger/Cross icon -->
		<svg
			class="h-6 w-6 transition-transform duration-300"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#if isBurgerMenuVisible}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				></path>
			{:else}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7"
				></path>
			{/if}
		</svg>
	</button>
	<nav class="hidden lg:ml-auto lg:flex lg:items-center" aria-label="Header">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16 md:gap-6">
			{#each settings.data.navigation as item, index (item.label)}
				<li
					class="relative uppercase hover:underline {isActiveLink(item)
						? 'font-bold text-primary'
						: ''}"
					on:mouseenter={index === 1 ? openMegaMenu : null}
					on:mouseleave={index === 1 ? closeMegaMenu : null}
				>
					{#if item.external_link}
						<PrismicLink
							field={item.link}
							class="flex items-center gap-2 hover:bg-secondary hover:text-primary"
						>
							{item.label}
							<ExtLink />
							<span class="sr-only">External link</span>
						</PrismicLink>
					{:else if index === 1}
						<button
							class="cursor-pointer uppercase {isActiveLink(item) || isCaveParentActive
								? 'font-bold text-primary'
								: ''}"
							on:click={openMegaMenu}
						>
							{item.label}
						</button>
					{:else}
						<PrismicLink
							field={item.link}
							class={isActiveLink(item) ? 'font-bold text-primary' : ''}
						>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Icône de recherche -->
	<button
		class="ml-4 hidden rounded-full p-2 transition-all duration-200 hover:bg-primary hover:bg-opacity-10 lg:block [&:hover_svg]:brightness-0 [&:hover_svg]:invert"
		aria-label="Rechercher"
		title="Rechercher"
	>
		<SearchIcon class="h-5 w-5" />
	</button>
</header>

{#if isBurgerMenuVisible}
	<BurgerMenu
		{settings}
		{regions}
		{colors}
		{isActiveLink}
		{isRegionActive}
		{isColorActive}
		{isCaveParentActive}
	/>
{/if}

{#if isMegaMenuVisible}
	<div
		role="navigation"
		aria-label="Mega menu"
		on:mouseenter={openMegaMenu}
		on:mouseleave={closeMegaMenu}
		class="sticky top-[85px] z-40 w-full py-3 shadow-md"
		style="opacity: {megaMenuOpacity}; transition: opacity 0.5s ease-in-out; background-color: white;"
	>
		<MegaMenu {regions} {colors} {isRegionActive} {isColorActive} />
	</div>
{/if}
