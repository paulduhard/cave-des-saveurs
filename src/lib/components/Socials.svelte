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
			<PrismicLink
				class="cursor-pointer transition-transform hover:scale-90 hover:cursor-pointer"
				field={item.lien}
				on:mouseover={() => {
					document.body.style.cursor = 'pointer';
				}}
				on:mouseout={() => {
					document.body.style.cursor = 'default';
				}}
			>
				<PrismicImage field={item.icone} />
			</PrismicLink>
		{/each}
	</div>
</section>
