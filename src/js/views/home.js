import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Character from "../component/Character";
import Vehicle from "../component/Vehicle";
import Planets from "../component/Planet";








export const Home = () => (
	
	<div className="container">
	  <div className="mt-2">
		<h3>Characters</h3>
		<Character/>
	  </div>
	  <div className="mt-2">
		<h3>Planets</h3>
		<Planets/>
	  </div>
	  <div className="mt-2">
		<h3>Vehicles</h3>
		<Vehicle/>
	  </div>
  
	</div>
  );