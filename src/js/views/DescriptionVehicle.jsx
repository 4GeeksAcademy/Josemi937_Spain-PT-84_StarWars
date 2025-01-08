import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const DescriptionVehicle = () => {
  const { id } = useParams();  
  console.log("ID desde la URL:", id);  

  const { store } = useContext(Context);  
  const [descriptionVehicle, setDescriptionVehicle] = useState(null);  

  useEffect(() => {
    console.log("Revisando vehículos en el store para el id:", id);
    const vehicle = store.vehicles.find((v) => v.uid === id); 
    console.log("Vehículo encontrado en el store:", vehicle);  

    if (vehicle) {
      
      if (vehicle.model) {
        setDescriptionVehicle(vehicle);  
      } else {
        fetchVehicleDetails(vehicle);  
      }
    } else {
      fetchVehicleDetails();  
    }
  }, [id, store]);  

  
  const fetchVehicleDetails = async (vehicle) => {
    try {
      console.log("Haciendo fetch para obtener detalles del vehículo...");
      const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
      const data = await response.json();
      console.log("Respuesta de la API:", data);  

      if (data.result) {
        const detailedVehicle = { ...vehicle, ...data.result.properties };  
        setDescriptionVehicle(detailedVehicle);  
      } else {
        console.error("Vehicle not found!");  
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);  
    }
  };

  if (!descriptionVehicle) {
    return <p>Loading vehicle details...</p>;  
  }

  return (
    <div className="container bg-dark mt-3 px-0">
      <div className="row">
        
        <div className="container col-md-4">
          <img
            src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
            className="container img-fluid"
            alt={descriptionVehicle.name}
          />
        </div>
        
        
        <div className="container col-md-8">
          <h3 className="container card-title text-white my-3">
            {descriptionVehicle.name}
          </h3>
          
          <div className="container row">
            <div className="col-md-5">
              <p className="card-text text-secondary">
                <span className="text-white">Model:</span> {descriptionVehicle.model}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Manufacturer:</span> {descriptionVehicle.manufacturer}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Cost in Credits:</span> {descriptionVehicle.cost_in_credits}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Length:</span> {descriptionVehicle.length}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Max Atmosphering Speed:</span> {descriptionVehicle.max_atmosphering_speed}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Crew:</span> {descriptionVehicle.crew}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Passengers:</span> {descriptionVehicle.passengers}
              </p>
            </div>
            <div className="col-md-5 mt-3">
              <p className="card-text text-secondary">
                <span className="text-white">Cargo Capacity:</span> {descriptionVehicle.cargo_capacity}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Consumables:</span> {descriptionVehicle.consumables}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Vehicle Class:</span> {descriptionVehicle.vehicle_class}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Created:</span> {descriptionVehicle.created}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Edited:</span> {descriptionVehicle.edited}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Url:</span> {descriptionVehicle.url}
              </p>
            </div>
          </div>

          <div className="container row mt-4">
            <ul className="col-md-5 text-white list-unstyled">
              Pilots:
              {Array.isArray(descriptionVehicle.pilots) && descriptionVehicle.pilots.length > 0 ? (
                descriptionVehicle.pilots.map((pilot) => (
                  <li className="text-secondary" key={pilot}>
                    {pilot}
                  </li>
                ))
              ) : (
                <p className="text-secondary">No pilots available.</p>
              )}
            </ul>
            <ul className="col-md-5 text-white list-unstyled">
              Films:
              {Array.isArray(descriptionVehicle.films) && descriptionVehicle.films.length > 0 ? (
                descriptionVehicle.films.map((film) => (
                  <li key={film} className="text-secondary">
                    {film}
                  </li>
                ))
              ) : (
                <p className="text-secondary">No films available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionVehicle;
