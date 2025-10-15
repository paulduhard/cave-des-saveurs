import { createClient } from '$lib/prismicio';
import { isFilled } from '@prismicio/client';
import type { PageServerLoad, EntryGenerator } from './$types';

type ItemWithOrdreMenu = {
	data: {
		ordre_menu?: number | null;
	};
};

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	try {
		const [page, regions, products] = await Promise.all([
			client.getSingle('alcools'),
			client.getAllByType('region'),
			client.getAllByType('produit_spiritueux', {
				fetchLinks: ['region.region', 'region.description']
			})
		]);

		const allProducts = products.map((p) => {
			let regionUID: string | null = null;
			let region: (typeof regions)[number] | undefined = undefined;

			if (isFilled.contentRelationship(p.data.region)) {
				regionUID = p.data.region.uid ?? null;
				region = regions.find((r) => r.uid === regionUID);
			}

			return {
				...p.data,
				regionUID,
				region,
				uid: p.uid
			};
		});

		const alcoolTypes = Array.from(new Set(allProducts.map((p) => p.type).filter(Boolean)));

		return {
			page,
			regions: sortByOrderMenu(regions),
			allProducts,
			alcoolTypes,
			title: 'Alcools et spiritueux - Cave des Saveurs',
			meta_title: 'Alcools et spiritueux - Cave des Saveurs',
			meta_description: "Découvrez notre sélection d'alcools et spiritueux",
			meta_image: page?.data?.meta_image || null
		};
	} catch (error) {
		console.error('Error fetching alcools data:', error);

		// Fallback
		const page = await client.getSingle('alcools').catch(() => null);

		return {
			page,
			regions: [],
			allProducts: [],
			alcoolTypes: [],
			title: 'Alcools et spiritueux - Cave des Saveurs',
			meta_title: 'Alcools et spiritueux fine - Cave des Saveurs',
			meta_description: "Découvrez notre sélection d'alcools et spiritueux",
			meta_image: null
		};
	}
};

function sortByOrderMenu<T extends ItemWithOrdreMenu>(items: T[]): T[] {
	return items.sort((a, b) => {
		const ordreA = a.data.ordre_menu ?? 0;
		const ordreB = b.data.ordre_menu ?? 0;
		return ordreA - ordreB;
	});
}

export const entries: EntryGenerator = async () => {
	return [{}];
};
