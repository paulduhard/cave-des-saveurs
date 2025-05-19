import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';
import type { PrismicDocument } from '@prismicio/types';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
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
};

type WithOrdreMenu = PrismicDocument<{
	ordre_menu: number;
}>;

function sortByOrderMenu<T extends PrismicDocument>(items: T[]): T[] {
	return items.sort((a, b) => (a.data.ordre_menu as number) - (b.data.ordre_menu as number));
}
