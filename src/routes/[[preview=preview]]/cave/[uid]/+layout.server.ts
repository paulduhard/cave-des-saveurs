import { createClient } from '$lib/prismicio';

type ItemWithOrdreMenu = {
	data: {
		ordre_menu?: number | null;
	};
};

export const prerender = 'auto';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	try {
		const [settings, regions, colors] = await Promise.all([
			client.getSingle('settings'),
			client.getAllByType('region'),
			client.getAllByType('couleur')
		]);

		return {
			settings,
			regions: sortByOrderMenu(regions),
			colors: sortByOrderMenu(colors)
		};
	} catch (error) {
		console.error('Error fetching shared data:', error);

		// Try to get at least the settings if other data fails
		let fallbackSettings;
		try {
			fallbackSettings = await client.getSingle('settings');
		} catch (settingsError) {
			console.error('Error fetching settings:', settingsError);
			fallbackSettings = null;
		}

		return {
			settings: fallbackSettings,
			regions: [],
			colors: []
		};
	}
}

function sortByOrderMenu<T extends ItemWithOrdreMenu>(items: T[]): T[] {
	return items.sort((a, b) => {
		const ordreA = a.data.ordre_menu ?? 0; // null ou undefined => 0
		const ordreB = b.data.ordre_menu ?? 0;
		return ordreA - ordreB;
	});
}
