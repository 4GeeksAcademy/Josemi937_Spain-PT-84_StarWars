import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import DescriptionCharacter from "./views/DescriptionCharacter.jsx";
import DescriptionPlanet from "./views/DescriptionPlanet.jsx";
import DescriptionVehicle from "./views/DescriptionVehicle.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";



const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/description/character/:id" element={<DescriptionCharacter />} />
            <Route path="/description/planet/:id" element={<DescriptionPlanet />} />
            <Route path="/description/vehicle/:id" element={<DescriptionVehicle />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

