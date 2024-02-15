import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate,useNavigate } from "react-router-dom";
import { All_ordenes } from "./all_ordenes.jsx";
import { Ordenes } from "./ordenes.jsx";
import PaypalButton from "../component/PayPalButtin.jsx";

export const Resumen = () => {
    const { store, actions } = useContext(Context);

    const [ total , setTotal ] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (Array.isArray(store.carrito)) {
            const newTotal = store.carrito.reduce((acc, item) => {
                return acc + ((item.product_info.price - 1) * item.amount);
            }, 0);
            setTotal(newTotal);
            actions.setPriceOrder(newTotal);
        }
    }, [store.carrito]); 

    function change (id , amount, id_Product , id_Restaurant, id_Order) {
        if (amount == 0){
            actions.deleteCart(id)
            return;
        }
    
        const cart = {
            amount: amount,
            id_Product : id_Product,
            id_Order : id_Order
        }

        actions.putCart(cart,id)
    
    }

    const crear = async () => {
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const anio = fechaActual.getFullYear();

      const order = {
        id: "",
        day_Date: dia,
        month_Date: mes,
        year_Date: anio,
        value: store.priceOrder,
        id_User: parseInt(localStorage.getItem("id")),
      };

      console.log(order)
      const id = await actions.postOrder(order);

      for (const element of store.carrito) {
        element.id_Order = id;
        console.log(element);
        await actions.addOrderCart(element, element.id);
        await actions.creado();
      }

      navigate('/ordenes')
      
    };

    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div className="card-body" style={{padding:"5% 20%"}}>
                <div className="table-responsive" style={{borderRadius:"8px"}}>
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead className="bg-light">
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Unidades</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                        {store.carrito.map((item) => (
                            <tr>
                                <td style={{paddingLeft:"30px"}}><img src={item.product_info.url_img} width="50px"/></td>
                                <td style={{alignItems:"center"}}>{item.product_info.name}</td>
                                <td style={{alignItems:"center"}}>{item.product_info.amount}/Unidades</td>
                                <td style={{alignItems:"center"}}>
                                    <div className="col-3 p-0">
                                        <div className="btn-group" role="group" aria-label="First group">
                                            <button type="button" className="btn btn-light" onClick={() => change(item.id, item.amount + 1, item.id_Product , item.id_Restaurant, item.id_Order)}>+</button>
                                            <div className="container d-flex align-items-center">{item.amount}</div>
                                            <button type="button" className="btn btn-light" onClick={() => change(item.id, item.amount - 1, item.id_Product , item.id_Restaurant, item.id_Order)}>-</button>
                                        </div>
                                    </div>
                                </td>
                                <td style={{alignItems:"center"}}>$ {(item.product_info.price - 1) * item.amount}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end py-3 px-0">
                        <div className="d-flex justify-content-around">
                            <div className="px-3"><b>Total</b></div>
                            <div className="mx-3" style={{color:"#800080", width:"120px"}}><b>$ {total}</b></div>
                        </div>
                    </div>
                    {total > 0 ? 
                    <>
                    {/* <Link className="d-flex justify-content-end" to="/ordenes"  style={{padding:"20px", paddingBottom:"0px", textDecoration:"none"}}>
                        <button type="button" className="btn btn-success" style={{backgroundColor:"#800080"}}onClick={crear}>Confirmar Orden</button>
                    </Link>  */}
                    <PaypalButton total={total} callback={crear}></PaypalButton>
                    </>
                    :
                    <div className="d-flex justify-content-end" style={{padding:"20px", paddingBottom:"0px"}}>
                        {/* <button type="button" className="btn btn-success" disabled={total <= 0} style={{backgroundColor:"#800080"}}>Confirmar Orden</button> */}
                    </div> 
                    }
                </div>
            </div>
        }
        </>  
    )
}