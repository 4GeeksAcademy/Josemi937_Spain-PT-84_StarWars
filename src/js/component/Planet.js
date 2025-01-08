import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";


const Planet = () => {
  const { store, actions } = useContext(Context); 
  const [imagesLoaded, setImagesLoaded] = useState({}); 

  useEffect(() => {
    actions.getPlanets();  
  }, []);

  
  if (!store.planets || store.planets.length === 0) {
    return <p>Loading planets...</p>;
  }

  
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); 
      img.onerror = () => resolve(false); 
      img.src = url;
    });
  };

  return (
    <div className="container">
      <div className="row scroll-cards flex-nowrap overflow-auto gap-2">
        {store.planets.map((planet) => {
          const planetId = planet.url.split("/")[5];
          const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
          const fallbackImageUrl = "https://via.placeholder.com/150?text=No+Image";

          
          if (!(planetId in imagesLoaded)) {
            checkImageExists(imageUrl).then((exists) => {
              setImagesLoaded((prev) => ({
                ...prev,
                [planetId]: exists ? imageUrl : fallbackImageUrl,
              }));
            });
          }

          const isFavorite = store.favorites.some(fav => fav.url === planet.url);

          return (
            <div key={planet.url} className="card col-md-3 col-sm-2 bg-dark text-secondary p-0 m-0">
              <div className="card-box-img overflow-hidden">
                <img
                  src={imagesLoaded[planetId] || fallbackImageUrl} 
                  className="card-img-top"
                  alt={planet.name}
                />
              </div>

              <div className="body-card container">
                <h5 className="my-2 text-white">{planet.name}</h5>
              </div>

              <div className="container d-flex justify-content-between align-items-end my-2">
                <Link to={`/description/planet/${planetId}`}>
                  <button className="btn btn-outline-secondary">Learn more!</button>
                </Link>

                <button
                  className={`btn ${isFavorite ? 'favorite' : 'btn-outline-danger'}`}
                  onClick={() => isFavorite ? actions.removeFavorite(planet) : actions.addFavorite(planet)}  
                >
                  <i className={`fa-regular fa-heart ${isFavorite ? 'text-white' : ''}`}></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planet;


