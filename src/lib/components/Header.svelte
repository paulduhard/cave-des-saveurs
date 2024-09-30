<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import ExtLink from './ExtLink.svelte';
	import MegaMenu from './MegaMenu.svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;

	let isMegaMenuVisible = false;

	function toggleMegaMenu() {
		isMegaMenuVisible = !isMegaMenuVisible;
	}
</script>

<header class="flex min-h-[85px] items-center justify-between bg-secondary px-12">
	<a href="/"><PrismicImage field={settings.data.logo_header} /></a>
	<nav class="mr-40" aria-label="Header">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16">
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
						<button on:click={toggleMegaMenu} class="uppercase">
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

{#if isMegaMenuVisible}
	<MegaMenu />
{/if}
