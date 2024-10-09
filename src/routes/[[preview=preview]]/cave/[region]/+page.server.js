import { createClient } from '$lib/prismicio';
import * as prismic from '@prismicio/client';
import { error } from '@sveltejs/kit';

// Fonction utilitaire pour récupérer les documents par leurs IDs
async function fetchDocumentsByIDs(client, ids) {
	if (ids.length === 0) return new Map();
	const documents = await client.getAllByIDs(ids);
	const documentsMap = new Map();
	documents.forEach((doc) => {
		documentsMap.set(doc.id, doc);
	});
	return documentsMap;
}

// Fonction utilitaire pour associer les domaines et les appellations aux vins
function associateDomainsAndAppellations(wines, domainesMap, appellationsMap) {
	return wines.map((wine) => {
		const domaine = domainesMap.get(wine.data.domaine?.id);
		const appellation = appellationsMap.get(wine.data.appellation?.id);
		return {
			...wine,
			fullDomainData: domaine?.data || null,
			fullAppellationData: appellation?.data || null
		};
	});
}

export async function load({ params }) {
	const client = createClient();
	const region = params.region;

	try {
		const [page, regionDoc] = await Promise.all([
			client.getSingle('cave'),
			client.getByUID('region', region)
		]);

		if (!regionDoc) {
			throw error(404, 'Région non trouvée');
		}

		const wines = await client.getAllByType('vin', {
			filters: [prismic.filter.at('my.vin.region', regionDoc.id)]
		});

		const wineDomainIDs = wines.map((wine) => wine.data.domaine?.id).filter((id) => !!id);
		const wineAppellationIDs = wines.map((wine) => wine.data.appellation?.id).filter((id) => !!id);
		const wineColorIDs = wines.map((wine) => wine.data.couleur?.id).filter((id) => !!id); // Ajouté

		const [domainesMap, appellationsMap, colorsMap] = await Promise.all([
			fetchDocumentsByIDs(client, wineDomainIDs),
			fetchDocumentsByIDs(client, wineAppellationIDs),
			fetchDocumentsByIDs(client, wineColorIDs) // Ajouté
		]);

		const winesWithDomainsAndAppellations = associateDomainsAndAppellations(
			wines,
			domainesMap,
			appellationsMap
		);

		const uniqueDomains = [
			...new Set(winesWithDomainsAndAppellations.map((wine) => wine.fullDomainData?.domaine))
		];

		const appellationsByDomain = new Map();
		winesWithDomainsAndAppellations.forEach((wine) => {
			const domainName = wine.fullDomainData?.domaine;
			const appellationName = wine.fullAppellationData?.nom;

			if (domainName && appellationName) {
				if (!appellationsByDomain.has(domainName)) {
					appellationsByDomain.set(domainName, new Set());
				}
				appellationsByDomain.get(domainName).add(appellationName);
			}
		});

		const colors = Array.from(colorsMap.values()).map((color) => ({
			uid: color.id,
			name: color.data.couleur // Utilisez la bonne propriété ici
		}));

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
			colors, // Ajouté
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
