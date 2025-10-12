<script lang="ts">
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import { page } from '$app/stores';
	import ExtLink from './ExtLink.svelte';
	import MegaMenu from './MegaMenu.svelte';
	import SearchIcon from './SearchIcon.svelte';
	import BurgerMenu from './BurgerMenu.svelte';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument, CouleurDocument } from '../../prismicio-types';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let alcoolTypes: string[] = [];

	let isMegaMenuVisible: boolean = false;
	let isBurgerMenuVisible: boolean = false;
	let closeMegaMenuTimeout: ReturnType<typeof setTimeout> | undefined;
	let megaMenuOpacity: number = 0;
	let isScrolled: boolean = false;

	function openMegaMenu() {
		console.log('openMegaMenu triggered');
		if (closeMegaMenuTimeout) clearTimeout(closeMegaMenuTimeout);
		isMegaMenuVisible = true;
		megaMenuOpacity = 1;
	}

	function closeMegaMenu() {
		console.log('closeMegaMenu triggered');
		closeMegaMenuTimeout = setTimeout(() => {
			isMegaMenuVisible = false;
			megaMenuOpacity = 0;
		}, 300);
	}

	function toggleBurgerMenu() {
		isBurgerMenuVisible = !isBurgerMenuVisible;
	}

	function closeBurgerMenu() {
		isBurgerMenuVisible = false;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 0;
	}

	// Variables réactives avec $app/stores
	$: currentPath = $page.url.pathname;
	$: isCaveParentActive = currentPath.startsWith('/cave/');

	// Force reactivity update for region/color functions
	let pathUpdate = '';
	$: pathUpdate = currentPath;

	// Manage body scroll based on burger menu visibility
	$: {
		if (typeof document !== 'undefined') {
			// Ensure code runs only in browser
			if (isBurgerMenuVisible) {
				document.body.classList.add('overflow-hidden');
			} else {
				document.body.classList.remove('overflow-hidden');
			}
		}
	}

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

	// Reactive functions that update when currentPath changes
	$: isRegionActive = (region: any) => {
		// Force dependency on pathUpdate to ensure reactivity
		pathUpdate;
		if (!region.uid) return false;
		const regionPath = region.uid === 'all' ? '/cave/all-wines' : `/cave/${region.uid}`;
		return currentPath === regionPath;
	};

	$: isColorActive = (color: any) => {
		// Force dependency on pathUpdate to ensure reactivity
		pathUpdate;
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
	<button
		class="block rounded-md p-2 transition-all duration-300 hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:hidden"
		on:click={toggleBurgerMenu}
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? toggleBurgerMenu() : null)}
		aria-expanded={isBurgerMenuVisible}
		aria-controls="burger-navigation"
		aria-label={isBurgerMenuVisible ? 'Fermer le menu' : 'Ouvrir le menu'}
	>
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

		<ul class="flex content-center items-center gap-16 md:gap-6">
			{#each settings.data.navigation as item, index (item.label)}
				<li
					class="relative uppercase hover:underline {isActiveLink(item)
						? 'font-bold text-primary'
						: ''}"
				>
					{#if item.external_link}
						<PrismicLink
							field={item.link}
							class="flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-200 hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						>
							{item.label}
							<ExtLink />
							<span class="sr-only">External link</span>
						</PrismicLink>
					{:else if index === 1}
						<button
							class="cursor-pointer rounded-md px-2 py-1 uppercase transition-all duration-200 hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 {isActiveLink(
								item
							) || isCaveParentActive
								? 'font-bold text-primary'
								: ''}"
							on:click={openMegaMenu}
							on:mouseenter={openMegaMenu}
							on:mouseleave={closeMegaMenu}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									openMegaMenu();
								}
							}}
							aria-expanded={isMegaMenuVisible}
							aria-controls="mega-menu"
						>
							{item.label}
						</button>
					{:else}
						<PrismicLink
							field={item.link}
							class="rounded-md px-2 py-1 transition-all duration-200 hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 {isActiveLink(
								item
							)
								? 'font-bold text-primary'
								: ''}"
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
		class="ml-4 hidden rounded-full p-2 transition-all duration-200 hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:block [&:focus_svg]:brightness-0 [&:focus_svg]:invert [&:hover_svg]:brightness-0 [&:hover_svg]:invert"
		aria-label="Rechercher"
		title="Rechercher"
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? e.currentTarget.click() : null)}
	>
		<SearchIcon class="h-5 w-5" />
	</button>
</header>

{#if isBurgerMenuVisible}
	<div id="burger-navigation">
		<BurgerMenu
			{settings}
			{regions}
			{colors}
			{isActiveLink}
			{isRegionActive}
			{isColorActive}
			{isCaveParentActive}
			onLinkClick={closeBurgerMenu}
		/>
	</div>
{/if}

{#if isMegaMenuVisible}
	<div
		class="fixed top-[85px] z-40 w-full py-3 shadow-md"
		style="opacity: {megaMenuOpacity}; transition: opacity 0.5s ease-in-out; background-color: white;"
		on:mouseenter={openMegaMenu}
		on:mouseleave={closeMegaMenu}
	>
		<nav
			id="mega-menu"
			aria-label="Mega menu"
			tabindex="0"
			on:keydown={(e) => {
				if (e.key === 'Escape') {
					closeMegaMenu();
				}
			}}
			class="focus:outline-none focus:ring-2 focus:ring-primary"
		>
			<MegaMenu {regions} {colors} {isRegionActive} {isColorActive} {alcoolTypes} />
		</nav>
	</div>
{/if}
