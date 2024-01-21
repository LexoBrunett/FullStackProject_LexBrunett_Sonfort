/* const firebaseConfig = {

  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
}; */

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)

/*import { initializeApp } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL , deleteObject } from "firebase/storage";
import { v4 } from 'uuid';


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);*/

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      categories: [],
      products: [],
      carrito: [],
      order: [],
      auth: false,
      user: null,
      creado: null,
      priceOrder: null,
      selectOpcion: null,
      name: null,
      errorLogin: false,
    },
    actions: {
      setErrorLogin: (i) => {
        setStore({ errorLogin: i });
      },

      setSelectOpcion: (opcion) => {
        setStore({ selectOpcion: opcion });
        console.log(opcion);
      },
      setPriceOrder: (price) => {
        setStore({ priceOrder: price });
      },
      vaciar: () => {
        setStore({ creado: false });
      },
      creado: () => {
        setStore({ creado: true });
      },
      validar: () => {
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
          setStore({ auth: true });
        }
      },
      postUser: async (data, isLogin) => {
        try {
          const endpoint = isLogin ? "api/login" : "api/users";
          const response = await fetch(process.env.BACKEND_URL + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //       Authorization: isLogin
              //         ? undefined
              //         : `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          });
          const res = await response.json();
          if (response.ok) {
            console.log(res);
          }
        } catch (error) {
          console.error("Error al realizar la solicitud POST:", error);
        }
      },
      login: async (data) => {
        try {
          const endpoint = "api/login" 
          const response = await fetch(process.env.BACKEND_URL + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //       Authorization: isLogin
              //         ? undefined
              //         : `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          });
          const res = await response.json();
          if (response.ok) {
            console.log(res);
	    setStore({user: res.user})
	    setStore({ auth: true });
	    localStorage.setItem("token", res.token)
	    localStorage.setItem("id", res.user.id);
      localStorage.setItem("is_admin", res.user.is_admin);
          }
        } catch (error) {
          console.error("Error al realizar la solicitud POST:", error);
        }
      },
      postAdmin: (email, password) => {
        fetch(process.env.BACKEND_URL + "api/login_admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => {
            if (response.status == 200) {
              setStore({ auth: true });
            } else {
              setStore({ errorLogin: true });
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user_id);
            setStore({ user: data.user });
          });
      },
      logout: () => {
        setStore({ auth: false });
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setStore({ user: "null" });
        getActions().getCart();
      },
      postRegister: (user) => {
        fetch(process.env.BACKEND_URL + "api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      },
      getCategories: async () => {
        const response = await fetch(process.env.BACKEND_URL + "api/category");
        const body = await response.json();
        setStore({ categories: body });
      },
      postCategories: async (obj) => {
        await fetch(process.env.BACKEND_URL + "api/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCategories();
      },
      putCategories: async (id, obj) => {
        await fetch(process.env.BACKEND_URL + "api/category/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCategories();
      },
      deleteCategories: async (id) => {
        await fetch(process.env.BACKEND_URL + "api/category/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCategories();
      },
      getList: () => {
        fetch(process.env.BACKEND_URL + "api/products", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((data) => setStore({ products: data }));
      },
      putProduct: async (id, obj) => {
        await fetch(process.env.BACKEND_URL + `api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));

        const product = await getStore().products.find(
          (product) => product.id == id
        );
        await getActions().getList();
      },
      postProduct: async (obj) => {
        await fetch(process.env.BACKEND_URL + "api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getList();
      },
      deleteProduct: async (id) => {
        await fetch(process.env.BACKEND_URL + "api/products/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));

        await getActions().getList();
        //const storageRef = ref( storage , `products/${idu}`);
        //await deleteObject(storageRef);
      },
      upload_img: async (file) => {
        const idu = v4();
        const storageRef = ref(storage, `products/${idu}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return [url, idu];
      },
      getCart: () => {
        fetch(process.env.BACKEND_URL + "api/cart", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ carrito: data });
            console.log("carrito", data);
          });
      },
      putCart: async (updatedCart, id) => {
        await fetch(process.env.BACKEND_URL + "api/cart/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(updatedCart),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCart();
      },
      addOrderCart: async (updatedCart, id) => {
        await fetch(process.env.BACKEND_URL + "api/cart_add_idOrder/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(updatedCart),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCart();
      },
      postCart: async (amount, id_product) => {
        await fetch(process.env.BACKEND_URL + "api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            amount: amount,
            id_Product: id_product,
            id_User: localStorage.getItem("id"),
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCart();
      },
      deleteCart: async (id) => {
        await fetch(process.env.BACKEND_URL + "api/cart/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getCart();
      },
      getOrder: (token) => {
        fetch(process.env.BACKEND_URL + "api/order", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ order: data });
            console.log(data);
          });
      },
      getAllOrder: (token) => {
        fetch(process.env.BACKEND_URL + "api/all_order", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setStore({ order: data }));
      },
      putOrder: async (updatedOrder, id) => {
        console.log(updatedOrder);
        await fetch(process.env.BACKEND_URL + "api/order/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(updatedOrder),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getAllOrder(localStorage.getItem("token"));
      },
      postOrder: async (order) => {
        order.id = v4();
        console.log(order);
        await fetch(process.env.BACKEND_URL + "api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(order),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getOrder(localStorage.getItem("token"));
        return order.id;
      },
      deleteOrder: async (id) => {
        await fetch(process.env.BACKEND_URL + "api/order/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        await getActions().getAllOrder(localStorage.getItem("token"));
      },
    },
  };
};

export default getState;
