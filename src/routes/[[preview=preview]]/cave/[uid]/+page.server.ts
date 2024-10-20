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

export async function load({ params }: LoadParams) {
	const client = createClient(repositoryName);
	const uid = params.uid;

	try {
		const region: PrismicDocument<RegionData> = await client.getByUID('region', uid);
		const winesResponse: PrismicDocument<WineData>[] = await client.getAllByType('vin');

		// Fetch domain data for each wine
		const winesWithDomains = await Promise.all(
			winesResponse.map(async (wine) => {
				if (wine.data.domaine.uid) {
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

		const title = asText(region.data.title) || region.data.region || 'Région';
		const metaTitle = region.data.meta_title || title;
		const metaDescription = region.data.meta_description || '';
		const metaImage = region.data.meta_image?.url || '';

		return {
			region: region.data,
			wines: winesWithDomains,
			title,
			meta_title: metaTitle,
			meta_description: metaDescription,
			meta_image: metaImage
		};
	} catch (error) {
		console.error('Error fetching region data:', error);
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
