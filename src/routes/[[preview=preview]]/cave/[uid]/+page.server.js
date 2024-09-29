import { createClient } from '$lib/prismicio';
import { repositoryName } from '$lib/prismicio';

export async function load({ params }) {
	const client = createClient(repositoryName);
	const uid = params.uid;

	try {
		const region = await client.getByUID('region', uid);
		const winesResponse = await client.getAllByType('vin');

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

		return {
			region: region.data,
			wines: winesWithDomains
		};
	} catch (error) {
		console.error('Error fetching region data:', error);
		return {
			region: null,
			wines: []
		};
	}
}
