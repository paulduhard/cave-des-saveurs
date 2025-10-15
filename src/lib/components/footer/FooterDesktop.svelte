<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument } from '../../../prismicio-types';
	import ExtLink from '../ExtLink.svelte';
	import { slugify } from '$lib/utils/slugify';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];
	export let alcoolTypes: string[] = [];
	export let epicerieTypes: string[] = [];

	// Produits épicerie par région
	const epicerieRegions = [
		'Spécialités Provençales',
		'Gastronomie du Sud-Ouest',
		'Charcuterie Ibérique et Produits Espagnols'
	];
</script>

<!-- Version Desktop - 3 colonnes -->
<div class="hidden md:block">
	<div class="grid grid-cols-3 gap-12">
		<!-- Colonne 1 - La cave à vins -->
		<div class="space-y-3">
			<h3 class="text-lg font-normal">La cave à vins</h3>

			<div class="space-y-3">
				<h4 class="text-sm font-normal underline">Par région</h4>
				<ul class="text-sm leading-4">
					{#each regions as region}
						<li>
							<a
								href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
								class="transition-colors duration-200 hover:underline"
							>
								{region.data.region}
							</a>
						</li>{/each}
				</ul>
			</div>
		</div>

		<!-- Colonne 2 - Autres boissons + Épicerie -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h3 class="text-lg font-normal underline">Autres boissons</h3>
				<ul class="text-sm leading-4">
					{#each alcoolTypes as type}
						<li>
							<a
								href={`/alcools?type=${slugify(type)}`}
								class="transition-colors duration-200 hover:underline"
							>
								{type}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="space-y-1 pt-4">
				<h3 class="text-lg font-normal">Épicerie</h3>
				<h4 class="text-sm font-normal underline">Par région</h4>
				<ul class="text-sm leading-4">
					{#each epicerieRegions as region}
						<li>{region}</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Colonne 3 - Nos produits + Liens + Coordonnées -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h3 class="text-lg font-normal underline">Nos produits</h3>
				<ul class="text-sm leading-4">
					{#each epicerieTypes as type}
						<li>
							<a
								href={`/epicerie?type=${slugify(type)}`}
								class="transition-colors duration-200 hover:underline"
							>
								{type}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="mt-4 flex flex-col gap-2">
				{#if settings.data.navigation && settings.data.navigation[0]?.link}
					<a
						href={settings.data.navigation[0].link.url}
						class="text-lg font-normal transition-colors duration-200 hover:underline"
					>
						La boutique
					</a>
				{/if}
				{#if settings.data.navigation && settings.data.navigation[settings.data.navigation.length - 1]?.link}
					<a
						href={settings.data.navigation[settings.data.navigation.length - 1].link.url}
						class="inline-flex items-center gap-2 text-lg font-normal transition-colors duration-200 hover:underline"
					>
						Les dégustations
						<ExtLink color="#ffffff" />
					</a>
				{/if}
			</div>

			<!-- Coordonnées sous la 3ème colonne -->
			<div class="pt-8 text-sm">
				{#if settings.data.adresse}
					<a
						href="https://maps.app.goo.gl/rpboHrYd2ha9ouip8"
						target="_blank"
						rel="noopener"
						class="text-sm transition-colors duration-200 hover:underline"
					>
						{settings.data.adresse}
					</a>
				{/if}
				{#if settings.data.telephone}
					<p>
						<a
							href="tel:{settings.data.telephone}"
							class="transition-colors duration-200 hover:underline"
						>
							{settings.data.telephone}
						</a>
					</p>
				{/if}
				{#if settings.data.email}
					<p>
						<a
							href="mailto:{settings.data.email}"
							class="transition-colors duration-200 hover:underline"
						>
							{settings.data.email}
						</a>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
