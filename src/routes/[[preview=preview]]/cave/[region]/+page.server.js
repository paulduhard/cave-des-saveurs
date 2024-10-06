import { createClient } from '$lib/prismicio';
import * as prismic from '@prismicio/client';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const client = createClient();
	const region = params.region;

	try {
		const page = await client.getSingle('cave');
		const regionDoc = await client.getByUID('region', region);

		if (!regionDoc) {
			throw error(404, 'Région non trouvée');
		}

		const wines = await client.getAllByType('vin', {
			filters: [prismic.filter.at('my.vin.region', regionDoc.id)]
		});

		const winesWithDomains = await Promise.all(
			wines.map(async (wine) => {
				if (wine.data.domaine && prismic.isFilled.contentRelationship(wine.data.domaine)) {
					try {
						const domaine = await client.getByID(wine.data.domaine.id);
						return { ...wine, fullDomainData: domaine.data };
					} catch (error) {
						console.error(`Error fetching domain for wine ${wine.id}:`, error);
						return wine;
					}
				}
				return wine;
			})
		);

		const domains = await client.getAllByType('domaine');
		const appellations = await client.getAllByType('appellation');
		const colors = await client.getAllByType('couleur');

		const title = regionDoc.data?.title
			? prismic.asText(regionDoc.data.title)
			: regionDoc.data?.region || 'Région';
		const metaTitle = regionDoc.data?.meta_title || title;
		const metaDescription = regionDoc.data?.description || '';
		const metaImage = regionDoc.data?.image?.url || '';

		return {
			page,
			region: regionDoc.data,
			wines: winesWithDomains,
			domains,
			appellations,
			colors,
			title,
			meta_title: metaTitle,
			meta_description: metaDescription,
			meta_image: metaImage
		};
	} catch (err) {
		console.error('Error loading region data:', err);

		if (err instanceof prismic.PrismicError && err.status === 404) {
			throw error(404, 'Région non trouvée');
		} else {
			throw error(500, 'Une erreur est survenue lors du chargement des données');
		}
	}
}
