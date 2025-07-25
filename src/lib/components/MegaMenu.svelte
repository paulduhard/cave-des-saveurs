<script>
	import { PrismicLink } from '@prismicio/svelte';

	export let regions = [];
	export let colors = [];

	$: sortedColors = colors.slice().sort((a, b) => a.data.ordre_menu - b.data.ordre_menu);
</script>

<nav class="mega-menu my-6 flex justify-center gap-32">
	<div class="region">
		<p class="mb-2 uppercase">Nos vins par région</p>
		<ul class="flex max-h-[175px] flex-col flex-wrap gap-x-12 overflow-y-auto pr-2">
			{#each regions as region (region.id)}
				<li>
					<PrismicLink
						href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
						class="hover:underline"
					>
						{region.data.region}
					</PrismicLink>
				</li>
			{/each}
		</ul>
	</div>
	<ul>
		<p class="mb-2 uppercase">Nos vins par couleur</p>
		{#each sortedColors as color (color.id)}
			<li>
				<PrismicLink href={`/cave/${color.uid}`} class="hover:underline">
					{color.data.couleur}
				</PrismicLink>
			</li>
		{/each}
	</ul>

	<div class="alcools">
		<p class="uppercase">Alcools et spiritueux</p>
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
