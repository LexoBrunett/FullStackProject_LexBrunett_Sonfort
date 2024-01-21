import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Products } from "./products.jsx";
import { Categorias } from "./categorias.jsx";
import { All_ordenes } from "./all_ordenes.jsx";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";

export const Home_admin = () => {
    const { store, actions } = useContext(Context)

    return (
      <div>
        <Link to={"/products"}>Productos<br></br></Link>
        <Link to={"/categorias"}>Categorias<br></br></Link>
        <Link to={"/all_ordenes"}>Ordenes<br></br></Link>
      </div>
    );
}

