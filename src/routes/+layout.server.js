import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const settings = await client.getSingle('settings');

	try {
		const [regions, colors] = await Promise.all([
			client.getAllByType('region'),
			client.getAllByType('couleur')
		]);

		return {
			settings,
			regions: sortByOrderMenu(regions),
			colors: sortByOrderMenu(colors)
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			settings,
			regions: [],
			colors: []
		};
	}
}

function sortByOrderMenu(items) {
	return items.sort((a, b) => a.data.ordre_menu - b.data.ordre_menu);
}
