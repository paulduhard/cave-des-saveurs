<script>
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';

	/** @type {import("@prismicio/client").Content.SettingsDocument} */
	export let settings;
</script>

<section class="flex flex-col justify-center gap-4 py-24 text-center md:h-[395px]">
	<div class="px-24 text-2xl md:px-0 md:text-4xl">
		<PrismicRichText field={settings.data.texte} />
	</div>
	<div class="flex items-baseline justify-center gap-12 pt-8">
		{#each settings.data.item as item}
			<PrismicLink field={item.lien}>
				<PrismicImage field={item.icone} />
			</PrismicLink>
		{/each}
	</div>
</section>
