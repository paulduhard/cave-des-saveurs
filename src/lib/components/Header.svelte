<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<header class="flex min-h-20 items-center bg-secondary">
	<!-- <PrismicImage field={data.logo_header} /> -->
	<nav>
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul class="flex content-center gap-16">
			{#each settings.data.navigation as item (item.label)}
				<li class="uppercase">
					<PrismicLink field={item.link} class="text-white">
						{item.label}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
</header>
