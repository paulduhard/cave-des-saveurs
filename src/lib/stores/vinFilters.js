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
		filteredWines: []
	});

	return {
		subscribe,
		setInitialData: (data) => {
			set({
				colors: data.colors,
				domains: data.domains,
				appellations: data.appellations,
				regions: data.regions,
				minPrice: 5,
				maxPrice: 200,
				filteredWines: data.wines,
				selectedColor: null,
				selectedDomain: data.domains[0]?.uid || null,
				selectedAppellation:
					data.appellations.find((app) => app.domainUid === data.domains[0]?.uid)?.uid || null,
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
		applyFilters: (allWines) => {
			update((state) => {
				state.filteredWines = allWines.filter((wine) => {
					const regionMatch =
						!state.selectedRegion || wine.data.region.uid === state.selectedRegion;
					const colorMatch = !state.selectedColor || wine.data.couleur.uid === state.selectedColor;
					const domainMatch =
						!state.selectedDomain || wine.data.domaine.uid === state.selectedDomain;
					const appellationMatch =
						!state.selectedAppellation || wine.data.appellation.uid === state.selectedAppellation;
					const priceMatch = wine.data.price >= state.minPrice && wine.data.price <= state.maxPrice;
					return regionMatch && colorMatch && domainMatch && appellationMatch && priceMatch;
				});
				return state;
			});
		}
	};
}

export const vinFilters = createVinFilters();
