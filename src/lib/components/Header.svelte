<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<header class="flex min-h-20 items-center justify-between bg-secondary px-8">
	<PrismicImage field={settings.data.logo_header} />
	<nav class="mr-40">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16">
			{#each settings.data.navigation as item (item.label)}
				<li class="uppercase hover:underline">
					<PrismicLink field={item.link}>
						{item.label}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
</header>
