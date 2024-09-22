<script>
	import { PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<footer class="flex items-center">
	<nav class="min-h-80 w-full bg-primary">
		<span class="sr-only">{settings.data.site_title} page d'accueil</span>

		<ul>
			{#each settings.data.navigation as item (item.label)}
				<li>
					<PrismicLink field={item.link} class="text-white">
						{item.label}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</nav>
	<aside
		class="absolute right-0 mr-12 flex min-w-96 flex-col gap-4 bg-[#f0efed] px-4 py-6 text-[15px]"
	>
		<div class="flex justify-center gap-2">
			<PrismicImage field={settings.data.logo_footer} />
			<div class="text-black font-['Sofia Pro'] h-7 w-[216px] text-[23px] font-light">
				la Cave des Saveurs
			</div>
		</div>
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
