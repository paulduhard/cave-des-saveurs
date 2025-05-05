export async function load({ params, parent }) {
	const { allWines, regions } = await parent(); // Récupère les données du layout

	const uid = params.uid;

	// Trouver la région correspondante
	const region = regions.find((r) => r.uid === uid);

	if (!region) {
		console.error(`Region not found: ${uid}`);
		return {
			region: null,
			wines: [],
			title: 'Région non trouvée',
			meta_title: 'Région non trouvée',
			meta_description: '',
			meta_image: ''
		};
	}

	// Filtrer les vins pour cette région
	const filteredWines = allWines.filter((wine) => wine.regionUID === uid);

	return {
		regionUID: uid,
		region: region.data,
		wines: filteredWines,
		title: region.data.region || 'Région',
		meta_title: region.data.meta_title || region.data.region,
		meta_description: region.data.meta_description || '',
		meta_image: region.data.meta_image?.url || ''
	};
}
