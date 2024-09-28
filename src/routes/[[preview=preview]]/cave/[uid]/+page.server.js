import { createClient } from '$lib/prismicio';
import { repositoryName } from '$lib/prismicio';

export async function load({ params }) {
	const client = createClient(repositoryName);
	const uid = params.uid;

	try {
		const region = await client.getByUID('region', uid);
		return {
			region: region.data
		};
	} catch (error) {
		console.error('Error fetching region data:', error);
		// Instead of throwing an error, return null or a default value
		return {
			region: null
		};
	}
}
