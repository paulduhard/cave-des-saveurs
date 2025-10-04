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
				'appellation.appellation',
				'vin.title',
				'vin.resume',
				'vin.image',
				'vin.nouveaute'
			]
		});

		// Extract data from linked documents
		const regionName = (page.data.region as any)?.data?.region ?? 'Non spécifié';
		const couleurName = (page.data.couleur as any)?.data?.couleur ?? 'Non spécifié';
		const domaineName = (page.data.domaine as any)?.data?.domaine ?? 'Non spécifié';
		const appellationName = (page.data.appellation as any)?.data?.appellation ?? 'Non spécifié';

		return {
			page,
			title: asText(page.data.title),
			meta_description: page.data.meta_description,
			meta_title: page.data.meta_title || asText(page.data.title),
			meta_image: page.data.meta_image?.url,
			region: regionName,
			couleur: couleurName,
			domaine: domaineName,
			appellation: appellationName,
			appellationDescription: (page.data.appellation as any)?.data?.description ?? null,
			regionDescription: (page.data.region as any)?.data?.description ?? null
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
