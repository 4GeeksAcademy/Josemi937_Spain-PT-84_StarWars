import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";

const Vehicle = () => {
  const { store, actions } = useContext(Context);

  
  useEffect(() => {
    actions.getVehicles();  
    console.log(store.vehicles);  
  }, [actions, store.vehicles]);  

  
  if (!store.vehicles || store.vehicles.length === 0) {
    return <p>Loading vehicles...</p>;  
  }

  return (
    <div className="container">
      <div className="row scroll-cards flex-nowrap overflow-auto gap-2">
        {store.vehicles.map((vehicle) => {
          const vehicleId = vehicle.url.split("/")[5];  

          
          const isFavorite = store.favorites.some(fav => fav.url === vehicle.url);

          return (
            <div
              key={vehicle.url}
              className="card col-md-3 col-sm-2 bg-dark text-secondary p-0 m-0"
            >
              <div className="card-box-img overflow-hidden">
                <img
                  src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`}
                  className="card-img-top"
                  alt={vehicle.name}
                />
              </div>

              <div className="body-card container">
                <h5 className="my-2 text-white">{vehicle.name}</h5>
              </div>

              <div className="container d-flex justify-content-between align-items-end my-2">
                <Link to={`/description/vehicle/${vehicleId}`}>
                  <button className="btn btn-outline-secondary">
                    Learn more!
                  </button>
                </Link>

                
                <button
                  className={`btn ${isFavorite ? 'favorite' : 'btn-outline-danger'}`}
                  onClick={() => isFavorite ? actions.removeFavorite(vehicle) : actions.addFavorite(vehicle)}  
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

export default Vehicle;
