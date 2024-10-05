import { createClient } from '$lib/prismicio';
import * as prismic from '@prismicio/client';

export async function load({ params }) {
	const client = createClient();
	const region = params.region;

	const page = await client.getSingle('cave');
	const regionDoc = await client.getByUID('region', region);

	const wines = await client.getAllByType('vin', {
		filters: [prismic.filter.at('my.vin.region', regionDoc.id)]
	});

	const winesWithDomains = await Promise.all(
		wines.map(async (wine) => {
			if (wine.data.domaine && prismic.isFilled.link(wine.data.domaine)) {
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

	const title = regionDoc.data.title
		? prismic.asText(regionDoc.data.title)
		: regionDoc.data.region || 'Région';
	const metaTitle = regionDoc.data.meta_title || title;
	const metaDescription = regionDoc.data.description || '';
	const metaImage = regionDoc.data.image?.url || '';

	return {
		page,
		region: regionDoc.data,
		wines: winesWithDomains,
		title,
		meta_title: metaTitle,
		meta_description: metaDescription,
		meta_image: metaImage
	};
}

// 	} catch (error) {
// 		console.error('Error fetching region data:', error);
// 		return {
// 			region: null,
// 			wines: [],
// 			title: 'Région non trouvée',
// 			meta_title: 'Région non trouvée',
// 			meta_description: '',
// 			meta_image: ''
// 		};
// 	}
// }

// export async function load({ params }) {
// 	const client = createClient(repositoryName);

// 	try {
// 		const winesResponse = await prismic.client.query([
// 			prismic.predicate.at('document.type', 'vin'),
// 			prismic.predicate.at('my.region.uid', uid)
// 		]);
// 		// 	filters: [
// 		// 		prismic.filter.at('document.type', 'vin'),
// 		// 		prismic.asLink(document.data.region),
// 		// 		prismic.filter.at('document.data.region.uid', uid)
// 		// 	]
// 		// });

// 		console.log('First wine:', winesResponse.results[0].data.region);

// 		// Fetch domain data for each wine
// 		const winesWithDomains = await Promise.all(
// 			winesResponse.map(async (wine) => {
// 				if (wine.data.domaine.uid) {
// 					try {
// 						const domaine = await client.getByUID('domaine', wine.data.domaine.uid);
// 						return { ...wine, fullDomainData: domaine.data };
// 					} catch (error) {
// 						console.error(`Error fetching domain data for UID ${wine.data.domaine.uid}:`, error);
// 						return wine;
// 					}
// 				}
// 				return wine;
// 			})
// 		);

//
