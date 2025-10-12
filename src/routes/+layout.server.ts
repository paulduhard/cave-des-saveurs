// 📦 Imports
import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';
import type { PrismicDocument } from '@prismicio/types';

// ⚙️ Configuration du rendu : SvelteKit choisit automatiquement entre SSG et SSR
export const prerender = 'auto';

// 🏗️ Fonction de chargement serveur - Données disponibles sur TOUTES les pages
export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	// 🔗 Initialisation du client Prismic avec hydratation (serveur → client)
	const client = createClient({ fetch, cookies });

	// 🏠 Configuration globale du site (logo, nom, SEO, etc.)
	const settings = await client.getSingle('settings');

			try {
			// 🚀 Chargement parallèle des données de navigation/filtres
			// TODO: Décommenter appellations et domaines quand prêt
			const [regions, colors, categories, appellations, domaines, produitsSpiritueux] = await Promise.all([
				client.getAllByType('region'), // 📍 Régions viticoles
				client.getAllByType('couleur'), // 🍷 Couleurs de vin
				client.getAllByType('categories'), // 🏷️ Catégories de produits
				client.getAllByType('appellation'), // 🍇 Appellations (AOC/AOP)
				client.getAllByType('domaine'), // 🏰 Domaines/Producteurs
				client.getAllByType('produit_spiritueux') // 🥃 Produits spiritueux
			]);
	
			const alcoolTypes = Array.from(new Set(produitsSpiritueux.map(p => p.data.type).filter(Boolean)));
	
			// ✅ Retour des données triées selon l'ordre défini dans Prismic
			return {
				settings, // Configuration globale
				regions: sortByOrderMenu(regions), // Régions triées
				colors: sortByOrderMenu(colors), // Couleurs triées
				categories: sortByOrderMenu(categories), // Catégories triées
				alcoolTypes, // Types d'alcools
				title: 'Cave des Saveurs' // Titre par défaut
			};
		} catch (error) {
			// 🚨 Gestion d'erreur : retourne des tableaux vides si Prismic échoue
			console.error('Error fetching data:', error);
			return {
				settings,
				regions: [],
				colors: [],
				categories: [],
				alcoolTypes: [], // Types d'alcools
				title: 'Cave des Saveurs'
			};
		}
	};
// 🔢 Fonction utilitaire : Trie les documents selon le champ "ordre_menu" de Prismic
function sortByOrderMenu<T extends PrismicDocument>(items: T[]): T[] {
	return items.sort((a, b) => (a.data.ordre_menu as number) - (b.data.ordre_menu as number));
}
