import React from "react";
import { Link } from "react-router-dom";

import back1 from "../../img/back1.jpg"
import back2 from "../../img/back2.png"

export const Slide = () => {
    return (
        <div className="container" style={{paddingTop:"40px"}}>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-item active" style={{backgroundImage: `url(${back1})`, backgroundSize: "cover", backgroundPosition: "center" , height:"540px", justifyContent:"start", alignItems:"center", borderRadius:"12px"}}>
                        <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center" style={{width:"400px", height:"320px" , marginLeft:"100px"}}>
                            <span className="badge" style={{background:"#ffc107", color:"black"}}>Descuento por Apertura del 40%</span>

                            <h2 className="text-white display-5 fw-bold mt-4">Tienda de Cosplays</h2>
                            <p className="lead">Compra tus cosplays yu accesorios con Seguridad y de forma Rapida.</p>
                            <Link to="/lista_por_categorias/1">
                                <button href="#!" className="btn btn-dark mt-3" tabIndex="-1">
                                    Compra Ya
                                    <i className="feather-icon icon-arrow-right ms-1"></i>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="carousel-item" style={{backgroundImage: `url(${back2})`, backgroundSize: "cover", backgroundPosition: "center" , height:"540px", justifyContent:"start", alignItems:"center", borderRadius:"12px"}}>
                        <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center" style={{width:"400px", height:"320px" , marginLeft:"100px"}}>
                            <span className="badge" style={{background:"#ffc107", color:"black"}}>Descuento por apertura del 40%</span>

                            <h2 className="text-white display-5 fw-bold mt-4">Cosplays de alta calidad</h2>
                            <p className="lead">Descubre la nueva forma de comprar lo que necesitas tus convenciones de anime!</p>
                            <Link to="/lista_por_categorias/2">
                                <button href="#!" className="btn btn-dark mt-3" tabIndex="0">
                                    Compra Ya
                                    <i className="feather-icon icon-arrow-right ms-1"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}