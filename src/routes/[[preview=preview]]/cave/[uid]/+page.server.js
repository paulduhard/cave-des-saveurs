import { error } from '@sveltejs/kit';
import { asText } from '@prismicio/client';
import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	try {
		const page = await client.getByUID('vin', params.uid, {
			fetchLinks: [
				'region.region',
				'couleur.couleur',
				'domaine.domaine',
				'appellation.nom' // Changed to fetch 'nom' instead of 'appellation'
			]
		});

		// Extract data from linked documents
		const regionName = page.data.region?.data?.region ?? 'Non spécifié';
		const couleurName = page.data.couleur?.data?.couleur ?? 'Non spécifié';
		const domaineName = page.data.domaine?.data?.domaine ?? 'Non spécifié';
		const appellationName = page.data.appellation?.data?.nom ?? 'Non spécifié'; // Changed to access 'nom'

		return {
			page,
			title: asText(page.data.title),
			meta_description: page.data.meta_description,
			meta_title: page.data.meta_title || asText(page.data.title),
			meta_image: page.data.meta_image?.url,
			region: regionName,
			couleur: couleurName,
			domaine: domaineName,
			appellation: appellationName
		};
	} catch (e) {
		console.error('Error fetching wine data:', e);
		throw error(404, 'Wine not found');
	}
}

export async function entries() {
	const client = createClient();

	try {
		const pages = await client.getAllByType('vin');
		return pages.map((page) => ({
			uid: page.uid
		}));
	} catch (e) {
		console.error('Error fetching all wines:', e);
		return [];
	}
}
