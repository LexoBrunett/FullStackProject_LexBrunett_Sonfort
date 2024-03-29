import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const User_login = () => {
    const { store, actions } = useContext(Context);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Agregado para controlar la visibilidad de la contraseña
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        setRedirect(false);
    }, [redirect]);

    function loguearUser(e) {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        actions.login({ email, password });
    }

    return (
        <div>
            <div onSubmit={loguearUser}>
                <div className="modal-header border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16" onClick={() => setSelectedOption(null)}>
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                    <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Inicia Sesion</h5>
                    <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="needs-validation" noValidate="">
                        <div className="mb-3">
                            <label htmlFor="inputName1" className="form-label"><b>User email</b></label>
                            <input type="text" className="form-control" id="inputName1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label"><b>Contraseña</b></label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="inputPassword1_userlogin" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu Contraseña" />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                    Mostrar
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-success" type="submit" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: "8px", backgroundColor: "#800080" }}><b>Loguear</b></button>
                    </form>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                    Aun no tienes cuenta? 
                    <div data-bs-dismiss="modal" aria-label="Close" style={{color:"#800080", textDecoration: "none"}}>
                        <b role="button" onClick={() => setRedirect(true)}>Registrate</b>
                        {redirect? <Navigate to="/user_registration" /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
