<script>
	import { PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<footer>
	<nav class="bg-primary">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul>
			{#each settings.data.navigation as item (item.label)}
				<li>
					<PrismicLink field={item.link}>
						{item.label}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
