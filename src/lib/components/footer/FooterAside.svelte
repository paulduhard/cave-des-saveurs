<script lang="ts">
	import { PrismicImage } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';

	export let settings: Content.SettingsDocument;
</script>

<aside
	class="flex flex-col justify-center gap-4 bg-[#f0efed] px-4 py-6 text-[13px] max-sm:border-[25px] max-sm:border-primary max-sm:leading-none md:absolute md:right-0 md:top-1/2 md:mr-12 md:h-full md:max-h-[250px] md:min-w-96 md:-translate-y-1/2 md:text-[15px]"
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
		<div class="text-black font-['Sofia Pro'] mx-auto mt-4 font-normal max-sm:w-56">
			<a href="/mentions-legales" class="underline">Mentions légales</a> | Illustrations non contractuelles
		</div>
	</div>
</aside>
