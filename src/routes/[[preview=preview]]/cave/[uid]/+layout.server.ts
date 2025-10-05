import { createClient } from '$lib/prismicio';
import { isFilled, asText } from '@prismicio/client';

type DomaineData = { domaine?: string };
type ItemWithOrdreMenu = {
	data: {
		ordre_menu?: number | null;
	};
};

export const prerender = 'auto';

export async function load({ fetch, cookies, params }) {
	const client = createClient({ fetch, cookies });

	try {
		const [settings, regions, colors, wines] = await Promise.all([
			client.getSingle('settings'),
			client.getAllByType('region'),
			client.getAllByType('couleur'),
			client.getAllByType('vin', {
				fetchLinks: [
					'domaine.domaine',
					'domaine.description',
					'appellation.appellation',
					'appellation.description'
				]
			})
		]);

		const allWines = wines.map((w) => {
			let regionUID: string | null = null;
			let region: (typeof regions)[number] | undefined = undefined;

			if (isFilled.contentRelationship(w.data.region)) {
				regionUID = w.data.region.uid ?? null;
				region = regions.find((r) => r.uid === regionUID);
			}

			let domaineName = 'Domaine non spécifié';
			if (
				isFilled.contentRelationship(w.data.domaine) &&
				(w.data.domaine.data as DomaineData)?.domaine
			) {
				domaineName = (w.data.domaine.data as DomaineData).domaine!;
			}

			// Extract color information
			let couleur = null;
			if (isFilled.contentRelationship(w.data.couleur)) {
				couleur = {
					uid: w.data.couleur.uid,
					data: w.data.couleur.data
				};
			}

			// Extract appellation information
			let appellation = null;
			if (isFilled.contentRelationship(w.data.appellation)) {
				appellation = {
					uid: w.data.appellation.uid,
					data: w.data.appellation.data
				};
			}

			return {
				...w.data,
				regionUID,
				domaineName,
				couleur,
				appellation,
				uid: w.uid
			};
		});

		// Generate metadata based on current region
		const uid = params.uid;
		const currentRegion = regions.find((r) => r.uid === uid);

		let title = 'Cave des Saveurs';
		let meta_title = 'Cave des Saveurs';
		let meta_description = 'Découvrez notre sélection de vins';
		let meta_image = null;

		if (currentRegion) {
			const regionName = currentRegion.data.region || 'Région';
			const description =
				asText(currentRegion.data.description) || `Découvrez nos vins de ${regionName}`;

			title = `${regionName} - Cave des Saveurs`;
			meta_title = `Vins de ${regionName} - Cave des Saveurs`;
			meta_description = description;
			meta_image = settings?.data?.og_image || null;
		} else if (uid === 'all-wines') {
			title = 'Tous nos vins - Cave des Saveurs';
			meta_title = 'Tous nos vins - Cave des Saveurs';
			meta_description = 'Découvrez toute notre sélection de vins';
		}

		return {
			settings,
			regions: sortByOrderMenu(regions),
			colors: sortByOrderMenu(colors),
			allWines,
			title,
			meta_title,
			meta_description,
			meta_image
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
			colors: [],
			allWines: [],
			title: 'Cave des Saveurs',
			meta_title: 'Cave des Saveurs',
			meta_description: 'Découvrez notre sélection de vins',
			meta_image: null
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
