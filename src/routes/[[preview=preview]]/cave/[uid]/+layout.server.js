import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const settings = await client.getSingle('settings');

	try {
		const [regions, colors, wines] = await Promise.all([
			client.getAllByType('region'),
			client.getAllByType('couleur'),
			client.getAllByType('vin')
		]);

		const allWines = wines.map((w) => {
			const region = regions.find((r) => r.uid === w.data.region.uid);

			return {
				...w.data,
				// region: {
				// 	title: region.data.region,
				// 	description: region.data.description,
				// 	id: region.id,
				// 	slug: region.uid
				// },
				regionUID: region.uid
			};
		});

		const uniqueRegions = allWines.reduce((acc, wine) => {
			const region = wine.region;

			// Check if the region is already in the accumulator
			const exists = acc.some((r) => r.id === region.id);

			if (!exists) {
				acc.push(region);
			}

			return acc;
		}, []);

		return {
			settings,
			regions: sortByOrderMenu(regions),
			colors: sortByOrderMenu(colors),
			allWines,
			uniqueRegions
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
