import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const DescriptionCharacter = () => {
  const params = useParams();
  const { store } = useContext(Context);
  const [descriptionCharacter, setDescriptionCharacter] = useState(null);
  const [homeworldName, setHomeworldName] = useState(null); 
  const { id } = useParams();  
  console.log("ID desde la URL:", id);  
  
  useEffect(() => {
   
    const character = store.people.find(
      (item) => item.url.split("/")[5] === params.id
    );

    if (character) {
      console.log("Found character:", character);

      
      fetch(character.url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Character data from second API call:", data);

          
          if (data.result && data.result.properties) {
            setDescriptionCharacter(data.result.properties);

            
            fetch(data.result.properties.homeworld)
              .then((response) => response.json())
              .then((homeworldData) => {
                console.log("Homeworld data:", homeworldData);
                if (homeworldData.result) {
                  setHomeworldName(homeworldData.result.properties.name);
                }
              })
              .catch((error) => console.log("Error fetching homeworld data:", error));
          } else {
            console.log("No 'properties' field in response");
          }
        })
        .catch((error) => console.log("Error fetching character details:", error));
    }
  }, [params.id, store.people]);

  if (!descriptionCharacter) {
    return <p>Loading character details...</p>;
  }

  console.log("DescriptionCharacter Data:", descriptionCharacter);

  return (
    <div className="container bg-dark mt-3 px-0">
      <div className="row">
        <div className="container col-md-4">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`}
            className="container img-fluid"
            alt={descriptionCharacter.name}
          />
        </div>
        <div className="container col-md-8">
          <h3 className="container card-title text-white my-3">
            {descriptionCharacter.name}
          </h3>
          <div className="container row">
            <div className="col-md-5">
              <p className="card-text text-secondary">
                <span className="text-white">Height:</span>{" "}
                {descriptionCharacter.height || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Mass:</span>{" "}
                {descriptionCharacter.mass || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Hair-Color:</span>{" "}
                {descriptionCharacter.hair_color || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Skin-Color:</span>{" "}
                {descriptionCharacter.skin_color || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Eye-Color:</span>{" "}
                {descriptionCharacter.eye_color || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Birth-Year:</span>{" "}
                {descriptionCharacter.birth_year || 'N/A'}
              </p>
            </div>

            <div className="col-md-5 mt-3">
              <p className="card-text text-secondary">
                <span className="text-white">Gender:</span>{" "}
                {descriptionCharacter.gender || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Homeworld:</span>{" "}
                {homeworldName || 'Loading...'} 
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Created:</span>{" "}
                {descriptionCharacter.created || 'N/A'}
              </p>
              <p className="card-text text-secondary">
                <span className="text-white">Edited:</span>{" "}
                {descriptionCharacter.edited || 'N/A'}
              </p>
              
              <p className="card-text text-secondary">
                <span className="text-white">Url:</span>{" "}
                {descriptionCharacter.url || 'N/A'}
              </p>
            </div>
          </div>

          <div className="container row mt-4">
            {descriptionCharacter.films && descriptionCharacter.films.length > 0 && (
              <ul className="container col text-white list-unstyled">
                Films:
                {descriptionCharacter.films.map((film, index) => (
                  <li className="text-secondary" key={index}>
                    {film}
                  </li>
                ))}
              </ul>
            )}

            {descriptionCharacter.species && descriptionCharacter.species.length > 0 && (
              <ul className="container col text-white list-unstyled">
                Species:
                {descriptionCharacter.species.map((specie, index) => (
                  <li className="text-secondary" key={index}>
                    {specie}
                  </li>
                ))}
              </ul>
            )}

            {descriptionCharacter.vehicles && descriptionCharacter.vehicles.length > 0 && (
              <ul className="container col text-white list-unstyled">
                Vehicles:
                {descriptionCharacter.vehicles.map((vehicle, index) => (
                  <li className="text-secondary" key={index}>
                    {vehicle}
                  </li>
                ))}
              </ul>
            )}

            {descriptionCharacter.starships && descriptionCharacter.starships.length > 0 && (
              <ul className="container col text-white list-unstyled">
                Starships:
                {descriptionCharacter.starships.map((starship, index) => (
                  <li className="text-secondary" key={index}>
                    {starship}
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

export default DescriptionCharacter;

