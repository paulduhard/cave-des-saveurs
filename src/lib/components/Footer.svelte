<script lang="ts">
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let settings: Content.SettingsDocument;
</script>

<footer class="flex flex-col items-center md:flex-row">
	<nav class="w-full bg-primary md:min-h-80" aria-label="Footer">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul>
			{#each settings.data.navigation as item (item.label)}
				<li>
					<PrismicLink field={item.link} class="inline-flex min-h-11 items-center text-secondary">
						{item.label}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
	<aside
		class="flex min-w-96 flex-col justify-center gap-4 bg-[#f0efed] px-4 py-6 text-[15px] md:absolute md:right-0 md:mr-12"
	>
		<a href="/" class="flex justify-center gap-2">
			<PrismicImage field={settings.data.logo_footer} />
			<div class="text-black font-['Sofia Pro'] h-7 w-[216px] text-[23px] font-light">
				la Cave des Saveurs
			</div>
		</a>
		<div class="text-center">
			<span class="text-black font-['Sofia Pro'] font-normal">
				La Cave des Saveurs : vins et épicerie fine en Arles<br />
			</span>
			<span class="text-black font-['Sofia Pro'] font-bold">
				L'abus d'alcool est dangereux pour la santé. <br /> À consommer avec modération.
			</span>
			<div class="mt-4 flex justify-center gap-2">
				<div class="text-black font-['Sofia Pro'] font-normal underline">Mentions légales</div>
				<div style="text-black font-normal font-['Sofia Pro']">
					| Illustrations non contractuelles
				</div>
			</div>
		</div>
	</aside>
</footer>
