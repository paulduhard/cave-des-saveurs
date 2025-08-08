<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import type { RegionDocument } from '../../../prismicio-types';

	export let settings: Content.SettingsDocument;
	export let regions: RegionDocument[] = [];

	// Liste des alcools et spiritueux
	const alcools = ['Champagne', 'Armagnac', 'Cognac', 'Spiritueux Provençaux'];

	// Produits épicerie par région
	const epicerieRegions = [
		'Spécialités Provençales',
		'Gastronomie du Sud-Ouest',
		'Charcuterie Ibérique et Produits Espagnols'
	];

	// Nos produits
	const nosProduits = ['Saumon fumée, Caviar et Tamar', 'Fromages'];

	// Autres produits
	const autresProduits = ['Épices et condiments', 'Miels et confitures'];
</script>

<!-- Version Mobile - 2 colonnes -->
<div class="block md:hidden">
	<div class="grid grid-cols-2 gap-8">
		<!-- Colonne 1 Mobile -->
		<div class="space-y-8">
			<!-- La cave à vins -->
			<div>
				<h3 class="mb-4 text-lg font-normal">La cave à vins</h3>
				<div class="space-y-1">
					<h4 class="text-md font-normal underline">Par région</h4>
					<ul class="text-sm">
						{#each regions.slice(0, 10) as region}
							<li>
								<a
									href={`/cave/${region.uid === 'all' ? 'all-wines' : region.uid}`}
									class="hover:text-gray-300 transition-colors duration-200"
								>
									{region.data.region}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="mt-6 space-y-1">
					<h4 class="text-md font-normal underline">Autres boissons</h4>
					<ul class="text-sm">
						{#each alcools as alcool}
							<li>{alcool}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<!-- Colonne 2 Mobile -->
		<div class="space-y-8">
			<!-- Épicerie -->
			<div>
				<h3 class="mb-4 text-lg font-normal">Épicerie</h3>
				<div class="space-y-1">
					<h4 class="text-md font-normal underline">Par région</h4>
					<ul class="text-sm">
						{#each epicerieRegions as region}
							<li>{region}</li>
						{/each}
					</ul>
				</div>

				<div class="mt-6 space-y-1">
					<h4 class="text-md font-normal underline">Nos produits</h4>
					<ul class="text-sm">
						{#each nosProduits as produit}
							<li>{produit}</li>
						{/each}
						{#each autresProduits as produit}
							<li>{produit}</li>
						{/each}
					</ul>
				</div>

				<div class="mt-4 flex flex-col gap-2">
					{#if settings.data.navigation && settings.data.navigation.length > 0}
						<PrismicLink
							field={settings.data.navigation[0].link}
							class="hover:text-gray-300 text-lg font-normal transition-colors duration-200"
						>
							La boutique
						</PrismicLink>
					{/if}
					{#if settings.data.navigation && settings.data.navigation.length > 1}
						<PrismicLink
							field={settings.data.navigation[settings.data.navigation.length - 1].link}
							class="hover:text-gray-300 text-lg font-normal transition-colors duration-200"
						>
							Les dégustations
						</PrismicLink>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Coordonnées Mobile en bas -->
	<div class="mt-6 text-sm">
		{#if settings.data.adresse}
			<a
				href="https://maps.app.goo.gl/rpboHrYd2ha9ouip8"
				target="_blank"
				rel="noopener"
				class="hover:text-gray-300 text-sm transition-colors duration-200"
			>
				{settings.data.adresse}
			</a>
		{/if}
		{#if settings.data.telephone}
			<p>
				<a
					href="tel:{settings.data.telephone}"
					class="hover:text-gray-300 transition-colors duration-200"
				>
					{settings.data.telephone}
				</a>
			</p>
		{/if}
		{#if settings.data.email}
			<p>
				<a
					href="mailto:{settings.data.email}"
					class="hover:text-gray-300 transition-colors duration-200"
				>
					{settings.data.email}
				</a>
			</p>
		{/if}
	</div>
</div>
