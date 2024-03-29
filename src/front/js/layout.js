import React, { useContext } from "react";
import injectContext from "./store/appContext";
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";

import { Categorias } from "./pages/categorias.jsx";
import { Categorias_user } from "./pages/categorias_user.jsx";
import { Crear_categorias } from "./pages/create_category.jsx";
import { Modificar_categorias } from "./pages/modificar_categorias.jsx";

import { Products } from "./pages/products.jsx";
import { Products_user } from "./pages/products_user.jsx";
import { Create_productos } from "./pages/create_product.jsx";
import { Modificar_productos } from "./pages/modificar_producto.jsx";

import { User_registration } from "./pages/user_registration.jsx";
import { User_login } from "./pages/user_login.jsx";
import { Resumen } from "./pages/resumen_carrito.jsx";
import { OrdenCreada } from "./pages/orden_creada.jsx";
import { Ordenes } from "./pages/ordenes.jsx";
import { Admin_login } from "./pages/login_admin.jsx";
import { Crear_admin } from "./pages/create_admin.jsx";
import { All_ordenes } from "./pages/all_ordenes.jsx";
import { Modificar_orden } from "./pages/modificar_orden.jsx";
import { Products_Categorias } from "./pages/productos_categorias.jsx";
import { Products2 } from "./pages/product2.jsx";
import { Icono } from "./component/icono.jsx";

import { Home_admin } from "./pages/home_admin.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { store } = useContext(Context)

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="row p-0">
                        <div className="col-9" style={{minWidth: store.user === "admin" ? "60%" : "85%", margin:"auto"}}>
                            <Routes> 
                                <Route element={<Home />} path="/" />
                                <Route element={<Home_admin />} path="/Home_admin" />
                                <Route element={<Categorias />} path="/categorias" />
                                <Route element={<Crear_categorias />} path="/crear_categorias" />
                                <Route element={<Modificar_categorias />} path="/modificar_categorias/:theid" />
                                <Route element={<User_registration />} path="/user_registration" />
                                <Route element={<Products />} path="/products" />
                                <Route element={<Create_productos />} path="/create" />
                                <Route element={<Modificar_productos />} path="/modificar/:id" />
                                <Route element={<User_login />} path="/user_login" />
                                <Route element={<Resumen />} path="/resumen" />
                                <Route element={<OrdenCreada />} path="/orden_creada" />
                                <Route element={<Ordenes />} path="/ordenes" />
                                <Route element={<Admin_login />} path="/admin_login" />
                                <Route element={<Crear_admin />} path="/crear_admin" />
                                <Route element={<All_ordenes />} path="/all_ordenes" />
                                <Route element={<Modificar_orden />} path="/modificar_orden/:index" />
                                <Route element={<Products_user />} path="/products_user" />
                                <Route element={<Categorias_user />} path="/categorias_user" />
                                <Route element={<Products_Categorias />} path="/lista_por_categorias/:id_cat" />
                                <Route element={<Products2 />} path="/product2" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                            {store.auth && store.user == "user" ? 
                                <Icono/>
                            : null }
                        </div>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);