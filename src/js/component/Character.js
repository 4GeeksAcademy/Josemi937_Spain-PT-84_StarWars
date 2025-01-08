import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";

const Character = () => {
  const { store, actions } = useContext(Context);

  
  useEffect(() => {
    actions.getCharacters();  
  }, [actions, store.people]);

  
  if (!store.people || store.people.length === 0) {
    return <p>Loading characters...</p>; 
  }

  return (
    <div className="container">
      <div className="row scroll-cards flex-nowrap overflow-auto gap-2">
        {store.people.map((character) => {
          const characterId = character.url.split("/")[5];  

          
          const isFavorite = store.favorites.some(fav => fav.url === character.url);

          return (
            <div
              key={character.url}
              className="card col-md-3 col-sm-2 bg-dark text-secondary p-0 m-0"
            >
              <div className="card-box-img overflow-hidden">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                  className="card-img-top"
                  alt={character.name}
                />
              </div>

              <div className="body-card container">
                <h5 className="my-2 text-white">{character.name}</h5>
              </div>

              <div className="container d-flex justify-content-between align-items-end my-2">
                <Link to={`/description/character/${characterId}`}>
                  <button className="btn btn-outline-secondary">
                    Learn more!
                  </button>
                </Link>

               
                <button
                  className={`btn ${isFavorite ? 'favorite' : 'btn-outline-danger'}`}
                  onClick={() => isFavorite ? actions.removeFavorite(character) : actions.addFavorite(character)}  
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

export default Character;
