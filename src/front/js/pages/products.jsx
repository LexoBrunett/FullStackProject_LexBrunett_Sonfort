import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Products = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getList();
  }, []);

  return (
    <>
      {!store.auth ? (
        <Navigate to="/" />
      ) : (
        <div className="card-body" style={{ padding: "3% 15% 3% 5%" }}>
          <h1 className="p-3">Productos</h1>
          <div className="table-responsive" style={{ borderRadius: "8px" }}>
            <table className="table table-centered table-hover text-nowrap table-borderless mb-5 table-with-checkbox">
              <thead className="bg-light">
                <tr>
                  <th style={{ paddingLeft: "30px" }}>Image</th>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {store.products.map((item) => (
                  <tr style={{}}>
                    <td className="td" style={{ paddingLeft: "30px" }}>
                      <img
                        width="40"
                        height="40"
                        src={item.url_img}
                        alt="Imagen Seleccionada"
                      />
                    </td>
                    <td className="td">
                      <b style={{ color: "#800080" }}>{item.name}</b>
                    </td>
                    <td className="td">{item.category_info.name}</td>
                    <td className="td">{item.price}</td>
                    <td className="td">
                      <div className="dropdown">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-three-dots-vertical dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                        <ul
                          className="dropdown-menu"
                          style={{ borderRadius: "8px" }}
                        >
                          <li>
                            <Link
                              to={`/modificar/${item.id}`}
                              style={{
                                textDecoration: "none",
                                width: "90%",
                                margin: "auto",
                                borderRadius: "8px",
                              }}
                            >
                              <a className="dropdown-item">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-pencil"
                                  viewBox="0 0 16 16"
                                  style={{ margin: " 2px 12px 5px 0px" }}
                                >
                                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                                Editar
                              </a>
                            </Link>
                          </li>
                          <li>
                            <a
                              onClick={() => actions.deleteProduct(item.id)}
                              className="dropdown-item"
                              href="#"
                              style={{
                                width: "90%",
                                margin: "auto",
                                borderRadius: "8px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                                style={{ margin: " 2px 12px 5px 0px" }}
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                              Borrar
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/create">
              <button
                onClick={() => actions.setSelectOpcion(5)}
                className="btn btn-success"
                type="submit"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ borderRadius: "8px", backgroundColor: "#800080" }}
              >
                <b>Nuevo Producto</b>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
