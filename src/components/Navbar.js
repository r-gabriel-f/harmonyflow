import React from "react";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <div >
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">Los Del Espacio</a>
          <form class="d-flex" role="search">
            
            <button class="btn btn-outline-success" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
