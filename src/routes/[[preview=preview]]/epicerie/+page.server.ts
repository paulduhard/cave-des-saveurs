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
			client.getSingle('epicerie'),
			client.getAllByType('region'),
			client.getAllByType('produitepicerie', {
				fetchLinks: ['origine.nom', 'origine.description']
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

		return {
			page,
			regions: sortByOrderMenu(regions),
			allProducts,
			title: 'Épicerie - Cave des Saveurs',
			meta_title: 'Épicerie fine - Cave des Saveurs',
			meta_description: "Découvrez notre sélection d'épicerie fine",
			meta_image: page?.data?.meta_image || null
		};
	} catch (error) {
		console.error('Error fetching epicerie data:', error);

		// Fallback
		const page = await client.getSingle('epicerie').catch(() => null);

		return {
			page,
			regions: [],
			allProducts: [],
			title: 'Épicerie - Cave des Saveurs',
			meta_title: 'Épicerie fine - Cave des Saveurs',
			meta_description: "Découvrez notre sélection d'épicerie fine",
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
