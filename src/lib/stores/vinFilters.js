import { writable } from 'svelte/store';

function createVinFilters() {
	const { subscribe, set, update } = writable({
		colors: [],
		selectedColor: null,
		domains: [],
		selectedDomain: null,
		appellations: [],
		selectedAppellation: null,
		regions: [],
		selectedRegion: null,
		minPrice: 5,
		maxPrice: 200,
		filteredWines: [],
		wines: [] // Ajouté pour stocker tous les vins
	});

	return {
		subscribe,
		setInitialData: (data) => {
			const firstDomainUid = data.domains[0]?.uid || null;
			const firstAppellationUid =
				data.appellations.find((app) => app.domainUid === firstDomainUid)?.uid || null;

			set({
				colors: data.colors,
				domains: data.domains,
				appellations: data.appellations,
				regions: data.regions,
				minPrice: 5,
				maxPrice: 200,
				filteredWines: data.wines,
				wines: data.wines, // Ajouté pour stocker tous les vins
				selectedColor: null,
				selectedDomain: firstDomainUid,
				selectedAppellation: firstAppellationUid,
				selectedRegion: data.selectedRegion
			});
		},
		updateFilter: (filterType, value) => {
			update((state) => {
				if (filterType === 'selectedRegion') {
					state.selectedDomain = null;
					state.selectedAppellation = null;
				} else if (filterType === 'selectedDomain' && value !== null) {
					state.selectedAppellation = null;
				} else if (filterType === 'selectedAppellation' && value !== null) {
					state.selectedDomain = null;
				}
				state[filterType] = value;
				return state;
			});
		},
		applyFilters: () => {
			update((state) => {
				console.log('Applying filters with state:', state); // Log l'état actuel des filtres
				state.filteredWines = state.wines.filter((wine) => {
					const regionMatch =
						!state.selectedRegion || wine.data.region.uid === state.selectedRegion;
					const colorMatch = !state.selectedColor || wine.data.couleur.uid === state.selectedColor;
					const domainMatch =
						!state.selectedDomain || wine.data.domaine.uid === state.selectedDomain;
					const appellationMatch =
						!state.selectedAppellation || wine.data.appellation.uid === state.selectedAppellation;
					const priceMatch = wine.data.prix >= state.minPrice && wine.data.prix <= state.maxPrice;

					// Ajoutez des logs pour chaque critère de filtrage
					console.log(`Wine: ${wine.uid}`);
					console.log(`Region Match: ${regionMatch}`);
					console.log(`Color Match: ${colorMatch}`);
					console.log(`Domain Match: ${domainMatch}`);
					console.log(`Appellation Match: ${appellationMatch}`);
					console.log(`Price Match: ${priceMatch}`);

					return regionMatch && colorMatch && domainMatch && appellationMatch && priceMatch;
				});
				console.log('Filtered wines:', state.filteredWines); // Log les vins filtrés
				return state;
			});
		}
	};
}

export const vinFilters = createVinFilters();
