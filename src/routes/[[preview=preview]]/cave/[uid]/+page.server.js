import { createClient } from '$lib/prismicio';
import { repositoryName } from '$lib/prismicio';

export async function load({ params }) {
	const client = createClient(repositoryName);
	const uid = params.uid;

	try {
		const response = await client.getByUID('region', uid);
		return {
			region: response.data
		};
	} catch (error) {
		console.error('Error fetching region data:', error);
		return {
			status: 500,
			error: new Error('Failed to fetch region data')
		};
	}
}
