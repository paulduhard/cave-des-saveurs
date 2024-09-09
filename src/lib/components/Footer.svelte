<script>
	import { PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<footer class="flex max-h-96">
	<nav class="bg-primary">
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
	<aside class="flex flex-col gap-6 bg-[#f0efed] px-6 py-10">
		<div class="flex justify-center gap-2">
			<img class="h-11 w-[49px]" src="https://via.placeholder.com/49x44" />
			<div class="text-black font-['Sofia Pro'] h-7 w-[216px] text-[23px] font-light">
				la Cave des Saveurs
			</div>
		</div>
		<div class="text-center">
			<span class="text-black font-['Sofia Pro'] text-[15px] font-normal">
				La Cave des Saveurs : vins et épicerie fine en Arles<br />
			</span>
			<span class="text-black font-['Sofia Pro'] text-[15px] font-bold">
				L'abus d'alcool est dangereux pour la santé. <br /> À consommer avec modération.
			</span>
		</div>
		<div class="flex justify-center">
			<div class="text-black font-['Sofia Pro'] text-[15px] font-normal underline">
				Mentions légales
			</div>
			<div style="text-black text-[15px] font-normal font-['Sofia Pro']">
				| Illustrations non contractuelles
			</div>
		</div>
	</aside>
</footer>
