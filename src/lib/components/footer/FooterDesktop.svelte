<script lang="ts">
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

<!-- Version Desktop - 3 colonnes -->
<div class="hidden md:block">
	<div class="grid grid-cols-3 gap-16">
		<!-- Colonne 1 - La cave à vins -->
		<div class="space-y-6">
			<h3 class="text-lg font-normal">La cave à vins</h3>

			<div class="space-y-3">
				<h4 class="text-sm font-normal underline">Par région</h4>
				<ul class="space-y-1 text-sm">
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
		</div>

		<!-- Colonne 2 - Autres boissons + Épicerie -->
		<div class="space-y-6">
			<div class="space-y-3">
				<h3 class="text-lg font-normal">Autres boissons</h3>
				<ul class="space-y-1 text-sm">
					{#each alcools as alcool}
						<li>{alcool}</li>
					{/each}
				</ul>
			</div>

			<div class="space-y-3">
				<h3 class="text-lg font-normal">Épicerie</h3>
				<h4 class="text-sm font-normal underline">Par région</h4>
				<ul class="space-y-1 text-sm">
					{#each epicerieRegions as region}
						<li>{region}</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Colonne 3 - Nos produits + Liens + Coordonnées -->
		<div class="space-y-6">
			<div class="space-y-3">
				<h3 class="text-lg font-normal">Nos produits</h3>
				<ul class="space-y-1 text-sm">
					{#each nosProduits as produit}
						<li>{produit}</li>
					{/each}
				</ul>
			</div>

			<div class="space-y-3">
				<h4 class="text-sm font-normal underline">Autres produits</h4>
				<ul class="space-y-1 text-sm">
					{#each autresProduits as produit}
						<li>{produit}</li>
					{/each}
				</ul>
			</div>

			<div class="space-y-4">
				<h3 class="text-lg font-normal underline">La boutique</h3>
				<h3 class="text-lg font-normal underline">Les dégustations</h3>
			</div>

			<!-- Coordonnées sous la 3ème colonne -->
			<div class="mt-8 space-y-2 text-sm">
				{#if settings.data.adresse}
					<p class="underline">{settings.data.adresse}</p>
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
	</div>
</div>
