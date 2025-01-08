import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

const DescriptionPlanet = () => {
  const { id } = useParams();  
  const { store } = useContext(Context); 
  const [descriptionPlanet, setDescriptionPlanet] = useState(null); 

  useEffect(() => {
    const planet = store.planets.find((p) => p.uid === id);  

    if (planet) {
      console.log("Planeta encontrado en el store:", planet);  

      
      if (planet.rotation_period) {
        setDescriptionPlanet(planet); 
      } else {
        fetchPlanetDetails(); 
      }
    } else {
      fetchPlanetDetails();  
    }
  }, [id, store]);  

  const fetchPlanetDetails = async () => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
      const data = await response.json();
      console.log("Respuesta de la API:", data);  

      if (data.result) {
        setDescriptionPlanet(data.result.properties);  
      } else {
        console.error("Planeta no encontrado!");
      }
    } catch (error) {
      console.error("Error fetching planet details:", error);  
    }
  };

  
  if (!descriptionPlanet) {
    return <p>Loading planet details...</p>;  
  }

  
  const extractUidFromUrl = (url) => {
    const parts = url.split('/');  
    return parts[parts.length - 1];  
  };

  
  const getPlanetImageUrl = (planet) => {
    const planetUid = extractUidFromUrl(planet.url);  
    console.log("Uid del planeta extraído:", planetUid);  

    
    if (planet.name === "Tatooine") {
      return `https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/4/4b/Tatooine-3.jpg?width=800`;  
    } else if (planetUid) {
      return `https://starwars-visualguide.com/assets/img/planets/${planetUid}.jpg`;  
    } else {
      return "https://placehold.it/800x600";  
    }
  };

  return (
    <div className="container bg-dark mt-3 px-0">
      <div className="row">
        
        <div className="container col-md-4">
          <img
            src={getPlanetImageUrl(descriptionPlanet)}  
            className="container img-fluid"
            alt={descriptionPlanet.name || "Planet Image"}
          />
        </div>

        
        <div className="container col-md-8">
          <h3 className="container card-title text-white my-3">
            {descriptionPlanet.name || "Unknown Planet"}
          </h3>
          <div className="container row">
            <div className="col-md-5">
              <p className="card-text text-secondary">
                <span className="text-white">Rotation Period:</span> {descriptionPlanet.rotation_period || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Orbital Period:</span> {descriptionPlanet.orbital_period || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Diameter:</span> {descriptionPlanet.diameter || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Climate:</span> {descriptionPlanet.climate || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Gravity:</span> {descriptionPlanet.gravity || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Terrain:</span> {descriptionPlanet.terrain || "N/A"}
              </p>
            </div>

            <div className="col-md-5 mt-3">
              <p className="card-text text-secondary">
                <span className="text-white">Surface Water:</span> {descriptionPlanet.surface_water || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Population:</span> {descriptionPlanet.population || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Created:</span> {descriptionPlanet.created || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Edited:</span> {descriptionPlanet.edited || "N/A"}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Url:</span> {descriptionPlanet.url}
              </p>
            </div>
          </div>

          <div className="container row mt-4">
            {descriptionPlanet.residents && descriptionPlanet.residents.length > 0 && (
              <ul className="col-md-5 text-white list-unstyled">
                Residents:
                {descriptionPlanet.residents.map((resident, index) => (
                  <li key={index} className="text-secondary">
                    {resident}
                  </li>
                ))}
              </ul>
            )}

            {descriptionPlanet.films && descriptionPlanet.films.length > 0 && (
              <ul className="col-md-5 text-white list-unstyled">
                Films:
                {descriptionPlanet.films.map((film, index) => (
                  <li key={index} className="text-secondary">
                    {film}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPlanet;



