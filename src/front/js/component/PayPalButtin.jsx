// App.js
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({total,callback}) => {
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total,
                currency:'USD'
              },
            },
          ],
        });
      };
      const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
          callback()
          console.log("Payment successful", details);
        });
      };
    
      const onError = (err) => {
      
        console.error("Error during payment", err);
      };
    
    return (
        <PayPalScriptProvider options={{ clientId: "AWuhfCjgke-W8vD3VTdxD1OTFuoAil6Afs1FbNuYoJF0Xf4P7N7obBooeCAwKPJsp991q3DsyXOgitOy" }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}
export default PaypalButton;
