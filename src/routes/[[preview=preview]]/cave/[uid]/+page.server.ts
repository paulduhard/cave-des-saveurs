import { createClient } from '$lib/prismicio';
import { isFilled, asText } from '@prismicio/client';
import { error } from '@sveltejs/kit';

type DomaineData = { domaine?: string };

export const prerender = 'auto';

export async function load({ fetch, cookies, params, parent }) {
	const client = createClient({ fetch, cookies });

	// Get layout data (settings, regions, colors)
	const { settings, regions, colors } = await parent();

	const uid = params.uid;

	try {
		// Find the current region
		const currentRegion = regions.find((r: any) => r.uid === uid);

		if (!currentRegion && uid !== 'all-wines') {
			throw error(404, 'Région non trouvée');
		}

		// Load wines with fetchLinks for related data
		const wines = await client.getAllByType('vin', {
			fetchLinks: [
				'domaine.domaine',
				'domaine.description',
				'appellation.appellation',
				'appellation.description'
			]
		});

		// Process wines data
		const allWines = wines.map((w) => {
			let regionUID: string | null = null;
			let region: (typeof regions)[number] | undefined = undefined;

			if (isFilled.contentRelationship(w.data.region)) {
				regionUID = w.data.region.uid ?? null;
				region = regions.find((r: any) => r.uid === regionUID);
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

		// Filter wines for current region
		const regionWines =
			uid === 'all-wines' ? allWines : allWines.filter((wine: any) => wine.regionUID === uid);

		// Generate metadata
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
			currentRegion,
			regionWines,
			allWines, // Keep this for filter facets
			colors, // Pass colors from parent
			title,
			meta_title,
			meta_description,
			meta_image,
			uid
		};
	} catch (err) {
		console.error('Error fetching region data:', err);
		throw error(500, 'Erreur lors du chargement des données');
	}
}
