<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { NumberField } from '@prismicio/types';
	import type { PrismicDocument } from '@prismicio/types';
	import type { RegionDocument, CouleurDocument } from '$lib/../../prismicio-types';
	import type { LinkField } from '@prismicio/client';

	type ItemWithOrdreMenu = {
		data: {
			ordre_menu?: NumberField;
		};
	};

	export let regions: RegionDocument[] = [];
	export let colors: CouleurDocument[] = [];
	export let className: string = '';

	$: sortedColors = colors
		.slice()
		.sort((a, b) => (a.data.ordre_menu ?? 0) - (b.data.ordre_menu ?? 0));
</script>

<nav class="my-6 flex justify-center gap-32">
	<div class="region">
		<p class="mb-2 uppercase text-primary">Nos vins par région</p>
		<ul class="flex max-h-[175px] flex-col flex-wrap gap-x-12 overflow-y-auto pr-2">
			{#each regions as region (region.id)}
				<li>
					<a
						href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
						class="hover:underline"
					>
						{region.data.region}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<ul>
		<p class="mb-2 uppercase text-primary">Nos vins par couleur</p>
		{#each sortedColors as color (color.id)}
			<li>
				<a href={`/cave/${color.uid}`} class="hover:underline">
					{color.data.couleur}
				</a>
			</li>
		{/each}
	</ul>

	<div class="alcools {className}">
		<p class="uppercase text-primary">Alcools et spiritueux</p>
		<ul class="flex max-h-[150px] flex-col flex-wrap gap-x-12 overflow-y-auto pr-2">
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
