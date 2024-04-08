import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React, { useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { pay } from '../../services/orderService';
import { useLoading } from '../../hooks/useLoading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaypalButtons({order}) {
    return (
       <PayPalScriptProvider 
       options={{
        clientId:"AUhsE0SseWp0mzQF1j4EzsIwqb1X7Pe1X_rUsWtJWAQqE766XhzTrzKyE6T6ue423tCqk28UYQxJ6wO-"
       }}>
        <Buttons order ={order} />

       </PayPalScriptProvider>
    );
}

function Buttons({ order }){
    const {clearCart} = useCart();
    const navigate = useNavigate();
    const [{isPending}] = usePayPalScriptReducer();
    const {showLoading, hideLoading} = useLoading();

    useEffect(() => {
        console.log("asd");
        isPending ? showLoading() : hideLoading();
    });

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: order.totalPrice,
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const payment = await actions.order.capture();
            const orderId = await pay(payment.id);
            clearCart();
            toast.success('Payment Saved Successfully', 'Success');
            navigate('/track' + orderId);
        } catch(error) {
            toast.error('Payment Save Failed', 'Error');
        }
    };

    const onError = err =>{
        toast.error('Payment Failed', 'Error');
    };
    return (
        <PayPalButtons
        createOrder ={createOrder}
        onApprove={onApprove}
        onError={onError}
        />
    );
}