import { asText, PrismicDocument } from '@prismicio/client';
import { createClient } from '$lib/prismicio';
import { repositoryName } from '$lib/prismicio';

interface RegionData {
	title: any;
	region: string;
	meta_title: string;
	meta_description: string;
	meta_image: { url: string } | null;
	description: any;
}

interface WineData {
	uid: string;
	data: {
		domaine: { uid: string };
		couleur: { uid: string };
		appellation: { uid: string };
		image: any;
		title: any;
		resume: any;
		prix: number;
	};
	fullDomainData?: any;
}

interface LoadParams {
	params: {
		uid: string;
	};
}

export async function load({ params }) {
	const client = createClient();
	const uid = params.uid;
	console.log({ uid });

	try {
		// Vérifions d'abord si la région existe
		const region = await client.getByUID('region', uid);
		if (!region) {
			throw new Error(`Region not found: ${uid}`);
		}

		// Récupérons tous les vins
		const winesResponse = await client.getAllByType('vin');

		// Debugging
		// console.log('Region UID:', uid);
		// console.log('Region data:', region.data);
		// console.log('Total wines:', winesResponse.length);

		// Filtrage avec plus de vérifications
		const filteredWines = winesResponse.filter((wine) => {
			// console.log('Wine data:', {
			// 	id: wine.id,
			// 	region: wine.data.region,
			// 	title: wine.data.title
			// });

			return wine.data.region && wine.data.region.uid === uid;
		});

		// console.log('Filtered wines:', filteredWines.length);

		const winesWithDomains = await Promise.all(
			filteredWines.map(async (wine) => {
				if (wine.data.domaine?.uid) {
					try {
						const domaine = await client.getByUID('domaine', wine.data.domaine.uid);
						return { ...wine, fullDomainData: domaine.data };
					} catch (error) {
						console.error(`Error fetching domain data for UID ${wine.data.domaine.uid}:`, error);
						return wine;
					}
				}
				return wine;
			})
		);

		return {
			region: region.data,
			wines: winesWithDomains,
			title: region.data.region || 'Région',
			meta_title: region.data.meta_title || region.data.region,
			meta_description: region.data.meta_description || '',
			meta_image: region.data.meta_image?.url || ''
		};
	} catch (error) {
		console.error('Error in load function:', error);
		// Au lieu de throw, retournons un objet avec des données par défaut
		return {
			region: null,
			wines: [],
			title: 'Région non trouvée',
			meta_title: 'Région non trouvée',
			meta_description: '',
			meta_image: ''
		};
	}
}
