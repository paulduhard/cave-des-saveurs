<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import ExtLink from './ExtLink.svelte';
	import MegaMenu from './MegaMenu.svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;

	// Importez les données des régions et des couleurs
	export let regions = [];
	export let colors = [];

	let isMegaMenuVisible = false;
	let isBurgerMenuVisible = false;
	let closeMegaMenuTimeout;
	let megaMenuOpacity = 0;

	function openMegaMenu() {
		clearTimeout(closeMegaMenuTimeout);
		isMegaMenuVisible = true;
		megaMenuOpacity = 1;
	}

	function closeMegaMenu() {
		closeMegaMenuTimeout = setTimeout(() => {
			isMegaMenuVisible = false;
			megaMenuOpacity = 0;
		}, 300); // Délai de 300ms avant de fermer le menu
	}

	function toggleBurgerMenu() {
		isBurgerMenuVisible = !isBurgerMenuVisible;
	}
</script>

<header
	class="sticky top-0 z-50 flex min-h-[85px] items-center justify-between gap-12 bg-secondary px-12 transition-all duration-300 hover:z-50"
>
	<a href="/"><PrismicImage field={settings.data.logo_header} /></a>
	<button class="block lg:hidden" on:click={toggleBurgerMenu}>
		<!-- Burger icon -->
		<svg
			class="h-6 w-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16m-7 6h7"
			></path>
		</svg>
	</button>
	<nav class="hidden lg:ml-auto lg:flex lg:items-center xl:mr-40" aria-label="Header">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16 md:gap-6">
			{#each settings.data.navigation as item, index (item.label)}
				<li
					class="relative uppercase hover:underline"
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
						<button class="cursor-pointer uppercase" on:click={openMegaMenu}>
							{item.label}
						</button>
					{:else}
						<PrismicLink field={item.link}>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>

{#if isBurgerMenuVisible}
	<nav class="bg-secondary p-4 lg:hidden" aria-label="Burger Menu">
		<ul class="flex flex-col gap-4">
			{#each settings.data.navigation as item, index (item.label)}
				<li class="uppercase hover:underline">
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
						<button class="cursor-pointer uppercase" on:click={openMegaMenu}>
							{item.label}
						</button>
					{:else}
						<PrismicLink field={item.link}>
							{item.label}
						</PrismicLink>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}

{#if isMegaMenuVisible}
	<div
		role="navigation"
		aria-label="Mega menu"
		on:mouseenter={openMegaMenu}
		on:mouseleave={closeMegaMenu}
		class="relative"
		style="opacity: {megaMenuOpacity}; transition: opacity 0.5s ease-in-out;"
	>
		<MegaMenu {regions} {colors} class="mega-menu" />
	</div>
{/if}
