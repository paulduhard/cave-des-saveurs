<script lang="ts">
	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';

	import type { Content } from '@prismicio/client';
	export let settings: Content.SettingsDocument;
</script>

<section class="flex flex-col justify-center gap-4 py-24 text-center md:h-[395px]">
	<div class="px-24 text-2xl md:px-0 md:text-4xl">
		<PrismicRichText field={settings.data.texte} />
	</div>
	<div class="flex items-baseline justify-center gap-12 pt-8">
		{#each settings.data.item as item}
			<PrismicLink
				class="cursor-pointer transition-transform duration-700 ease-in-out hover:scale-90 hover:cursor-pointer"
				field={item.lien}
			>
				<PrismicImage field={item.icone} />
			</PrismicLink>
		{/each}
	</div>
</section>
