import { createClient } from '$lib/prismicio';
import * as prismic from '@prismicio/client';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const client = createClient();
	const region = params.region;

	try {
		const page = await client.getSingle('cave');
		const regionDoc = await client.getByUID('region', region);

		if (!regionDoc) {
			throw error(404, 'Région non trouvée');
		}

		const wines = await client.getAllByType('vin', {
			filters: [prismic.filter.at('my.vin.region', regionDoc.id)]
		});

		const wineDomainIDs = wines.map((wine) => wine.data.domaine?.id).filter((id) => !!id);

		const domainesMap = new Map();
		if (wineDomainIDs.length > 0) {
			const domaines = await client.getAllByIDs(wineDomainIDs);

			domaines.forEach((domaine) => {
				domainesMap.set(domaine.id, domaine);
			});
		}

		const winesWithDomains = wines.map((wine) => {
			const domaine = domainesMap.get(wine.data.domaine?.id);
			return { ...wine, fullDomainData: domaine?.data || null };
		});

		const uniqueDomains = [...new Set(winesWithDomains.map((wine) => wine.fullDomainData?.name))];

		// Créer une liste des appellations associées à chaque domaine
		const appellationsByDomain = new Map();

		winesWithDomains.forEach((wine) => {
			const domainName = wine.fullDomainData?.name;
			const appellation = wine.data.appellation?.name;

			if (domainName && appellation) {
				if (!appellationsByDomain.has(domainName)) {
					appellationsByDomain.set(domainName, new Set());
				}
				appellationsByDomain.get(domainName).add(appellation);
			}
		});

		const {
			title = 'Région',
			meta_title = title,
			description: meta_description = '',
			image: meta_image = {}
		} = regionDoc.data;

		return {
			page,
			region: regionDoc.data,
			wines: winesWithDomains,
			domains: uniqueDomains,
			appellationsByDomain: Array.from(appellationsByDomain.entries()).map(
				([domain, appellations]) => ({
					domain,
					appellations: Array.from(appellations)
				})
			),
			title,
			meta_title,
			meta_description,
			meta_image: meta_image.url || ''
		};
	} catch (err) {
		console.error('Error loading region data:', err);

		if (err instanceof prismic.PrismicError && err.status === 404) {
			throw error(404, 'Région non trouvée');
		} else {
			throw error(500, 'Une erreur est survenue lors du chargement des données');
		}
	}
}
