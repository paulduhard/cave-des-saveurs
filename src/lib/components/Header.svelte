<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<header class="flex min-h-[85px] items-center justify-between bg-secondary px-12">
	<a href="/"><PrismicImage field={settings.data.logo_header} /></a>
	<nav class="mr-40">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16">
			{#each settings.data.navigation as item (item.label)}
				<li class="uppercase hover:underline">
					{#if item.external_link}
						<PrismicLink field={item.link} class="hover:bg-secondary hover:text-primary">
							{item.label}
							<img
								src="/assets/icone-external-link-black.svg"
								alt="lien externe"
								class="mb-1 ml-2 inline h-4 w-4"
							/>
						</PrismicLink>
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
