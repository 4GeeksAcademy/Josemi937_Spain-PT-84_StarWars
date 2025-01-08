import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context); 

  return (
    <nav className="ps-5 navbar bg-secondary mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0">
          <img
            className="brand"
            alt="Logo"
            width="120"
            height="auto"
            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254" 
          />
        </span>
      </Link>

      <div className="dropdown pe-5">
        <button
          className="btn-nav glow-on-hover"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites
        </button>
        <ul className="dropdown-menu">
          {store.favorites.length === 0 ? (
            <li>No favorites added</li>
          ) : (
            store.favorites.map((favorite) => (
              <li key={favorite.url}>
                <Link to={`/description/planet/${favorite.url.split("/")[5]}`} className="dropdown-item">
                  {favorite.name}
                </Link>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => actions.removeFavorite(favorite)} 
                  title="Remove from favorites"
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

