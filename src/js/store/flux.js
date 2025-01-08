const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			vehicles: [],
			
			favorites: JSON.parse(localStorage.getItem('favorites')) || [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},

		actions: {
			
			
			getCharacters: async () => {
				const { people } = getStore();
				if (people.length > 0) return;  

				try {
					const response = await fetch("https://www.swapi.tech/api/people");
					if (response.ok) {
						const data = await response.json();
						setStore({ people: data.results }); 
					}
				} catch (error) {
					console.log("Error fetching characters:", error);
				}
			},

			getPlanets: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/planets");
					if (response.ok) {
						const data = await response.json();
						
						setStore({ planets: data.results }); 
					}
				} catch (error) {
					console.log("Error fetching planets:", error);
				}
			},

			getVehicles: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/vehicles");
					if (response.ok) {
						const data = await response.json();
						
						setStore({ vehicles: data.results }); 
					}
				} catch (error) {
					console.log("Error fetching vehicles:", error);
				}
			},

			
			addFavorite: (item) => {
				const store = getStore();
				
				const itemExists = store.favorites.some(fav => fav.url === item.url);
				if (!itemExists) {
					const updatedFavorites = [...store.favorites, item]; 
					setStore({ favorites: updatedFavorites });

					
					localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
				}
			},

			
			removeFavorite: (item) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(fav => fav.url !== item.url); 
				setStore({ favorites: updatedFavorites });

				
				localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			},

			
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

