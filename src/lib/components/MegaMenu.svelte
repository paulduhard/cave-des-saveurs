<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NumberField } from '@prismicio/types';
	import type { PrismicDocument } from '@prismicio/types';
	import type { RegionDocument, CouleurDocument } from '../../prismicio-types';
	import type { LinkField } from '@prismicio/client';
	import { fade } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';

	type ItemWithOrdreMenu = {
		data: {
			ordre_menu?: NumberField;
		};
	};

	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let className: string = '';
	export let isRegionActive: (region: any) => boolean;
	// export let isColorActive: (color: any) => boolean;

	$: sortedColors = colors
		.slice()
		.sort((a, b) => (a.data.ordre_menu ?? 0) - (b.data.ordre_menu ?? 0));
</script>

<nav class="mega-menu my-6 flex flex-col justify-center gap-8 md:flex-row md:gap-32" in:fade={{ duration: 300, easing: cubicOut }} out:fade={{ duration: 300, easing: cubicIn }}>
	<div class="region">
		<p class="mb-2 uppercase text-primary">Nos vins par région</p>
		<ul class="flex max-h-[175px] flex-col flex-wrap gap-x-4 overflow-y-auto pr-2 md:gap-x-12">
			{#each regions as region (region.id)}
				<li>
					<a
						href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
						class="hover:underline {isRegionActive(region) ? 'font-bold text-primary' : ''}"
					>
						{region.data.region}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<!-- <div class="couleur">
		<p class="mb-2 uppercase text-primary">Nos vins par couleur</p>
		<ul>
			{#each sortedColors as color (color.id)}
				<li>
					<a
						href={`/cave/${color.uid}`}
						class="hover:underline {isColorActive(color) ? 'font-bold text-primary' : ''}"
					>
						{color.data.couleur}
					</a>
				</li>
			{/each}
		</ul>
	</div> -->

	<div class="alcools {className}">
		<p class="uppercase text-primary">Alcools et spiritueux</p>
		<ul class="flex max-h-[150px] flex-col flex-wrap gap-x-4 overflow-y-auto pr-2 md:gap-x-12">
			<li>Cognacs</li>
			<li>Armagnacs</li>
			<li>Whiskies</li>
			<li>Rhums</li>
			<li>Gin</li>
			<li>Eaux de vie et liqueurs</li>
			<li>Anisés</li>
			<li>Téquilas et Mezcals</li>
			<li>Apéritifs et mixologie</li>
			<li>Bières</li>
		</ul>
	</div>
</nav>
