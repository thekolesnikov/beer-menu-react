import { create } from 'zustand';

const useBeerStore = create((set) => ({
    beers: [],
    selectedBeers: [],
    currentPage: 1,
    fetchBeers: async (setIsLoading) => {
        setIsLoading(true);
        try {
            const { currentPage } = useBeerStore.getState();
            const response = await fetch(
                `https://api.punkapi.com/v2/beers?page=${currentPage}`
            );
            const data = await response.json();
            set((state) => ({
                beers: data,
                currentPage: state.currentPage + 1,
            }));
        } catch (error) {
            console.error('Error fetching');
        }
        setIsLoading(false);
    },
    selectBeer: (id) =>
        set((state) => {
            const selectedBeer = state.beers.find((item) => item.id === id);
            if (selectedBeer) {
                return {
                    selectedBeers: [...state.selectedBeers, selectedBeer],
                };
            }
            return state;
        }),
    deleteSelectedBeer: (id) =>
        set((state) => ({
            selectedBeers: state.selectedBeers.filter((item) => item.id !== id),
        })),
    deleteSelectedBeers: () =>
        set((state) => ({
            beers: state.beers.filter(
                (item) => !state.selectedBeers.includes(item)
            ),
            selectedBeers: [],
        })),
}));

export default useBeerStore;
