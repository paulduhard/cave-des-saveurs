import { createClient } from '$lib/prismicio';
import { isFilled } from '@prismicio/client';

type DomaineData = { domaine?: string };
type ItemWithOrdreMenu = {
	data: {
		ordre_menu?: number | null;
	};
};

export const prerender = 'auto';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const settings = await client.getSingle('settings');

	try {
		const [regions, colors, wines] = await Promise.all([
			client.getAllByType('region'),
			client.getAllByType('couleur'),
			client.getAllByType('vin', { fetchLinks: ['domaine.domaine'] })
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

			return {
				...w.data,
				regionUID,
				domaineName,
				uid: w.uid
			};
		});

		const uniqueRegions = allWines.reduce<typeof regions>((acc, wine) => {
			const regionUID = wine.regionUID; // ou wine.region?.uid si tu n'as pas déjà extrait le uid
			if (!regionUID) return acc;

			// On cherche la région complète dans le tableau regions
			const region = regions.find((r) => r.uid === regionUID);
			if (region && !acc.some((r) => r.id === region.id)) {
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

function sortByOrderMenu<T extends ItemWithOrdreMenu>(items: T[]): T[] {
	return items.sort((a, b) => {
		const ordreA = a.data.ordre_menu ?? 0; // null ou undefined => 0
		const ordreB = b.data.ordre_menu ?? 0;
		return ordreA - ordreB;
	});
}
