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

		// Récupérer les IDs des domaines et des appellations
		const wineDomainIDs = wines.map((wine) => wine.data.domaine?.uid).filter((id) => !!id);
		const wineAppellationIDs = wines.map((wine) => wine.data.appellation?.uid).filter((id) => !!id);

		// Récupérer les domaines par leurs IDs
		const domainesMap = new Map();
		if (wineDomainIDs.length > 0) {
			const domaines = await client.getAllByIDs(wineDomainIDs);

			domaines.forEach((domaine) => {
				domainesMap.set(domaine.uid, domaine);
			});
		}

		// Récupérer les appellations par leurs IDs
		const appellationsMap = new Map();
		if (wineAppellationIDs.length > 0) {
			const appellations = await client.getAllByIDs(wineAppellationIDs);

			appellations.forEach((appellation) => {
				appellationsMap.set(appellation.uid, appellation);
			});
		}

		// Associer les domaines et les appellations aux vins
		const winesWithDomainsAndAppellations = wines.map((wine) => {
			const domaine = domainesMap.get(wine.data.domaine?.uid);
			const appellation = appellationsMap.get(wine.data.appellation?.uid);
			return {
				...wine,
				fullDomainData: domaine?.data || null,
				fullAppellationData: appellation?.data || null
			};
		});

		// Extraire les domaines uniques
		const uniqueDomains = [
			...new Set(winesWithDomainsAndAppellations.map((wine) => wine.fullDomainData?.domaine))
		];

		// Associer les appellations aux domaines
		const appellationsByDomain = new Map();
		winesWithDomainsAndAppellations.forEach((wine) => {
			const domainName = wine.fullDomainData?.domaine;
			const appellationName = wine.fullAppellationData?.name;

			if (domainName && appellationName) {
				if (!appellationsByDomain.has(domainName)) {
					appellationsByDomain.set(domainName, new Set());
				}
				appellationsByDomain.get(domainName).add(appellationName);
			}
		});

		const {
			title = regionDoc.data?.title
				? prismic.asText(regionDoc.data.title)
				: regionDoc.data?.region || 'Région',
			meta_title = title,
			description: meta_description = '',
			image: meta_image = {}
		} = regionDoc.data;

		return {
			page,
			region: regionDoc.data,
			wines: winesWithDomainsAndAppellations,
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

		if (err instanceof prismic.PrismicError && err.response?.status === 404) {
			throw error(404, 'Région non trouvée');
		} else {
			throw error(500, 'Une erreur est survenue lors du chargement des données');
		}
	}
}
