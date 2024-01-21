import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Products } from "./products.jsx";
import { Categorias } from "./categorias.jsx";
import { All_ordenes } from "./all_ordenes.jsx";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";

export const Home_admin = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container" style={{ width: "100%", height: "100%" }}>
      <Link
        to="/products"
        className={`mi-boton`}
        style={{
          width: "247px",
          height: "48px",
          padding: "8px 28px",
          marginBottom: "4px",
          borderRadius: "8px",
        }}
      >
        <div className="row">
          <div className="col-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
          <div className="col-10">Productos</div>
        </div>
      </Link>

      <Link
        to="/categorias"
        className={`mi-boton`}
        style={{
          width: "247px",
          height: "48px",
          padding: "8px 28px",
          marginBottom: "4px",
          borderRadius: "8px",
        }}
      >
        <div className="row">
          <div className="col-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list-ul"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
              />
            </svg>
          </div>
          <div className="col-10">Categorias</div>
        </div>
      </Link>

      <Link
        to="/all_ordenes"
        className={`mi-boton`}
        style={{
          width: "247px",
          height: "48px",
          padding: "8px 28px",
          marginBottom: "4px",
          borderRadius: "8px",
        }}
      >
        <div className="row">
          <div className="col-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H" />
            </svg>
          </div>
          <div className="col-10">Mis Ordenes</div>
        </div>
      </Link>
    </div>
  );
};
