import React, {useState, useEffect,useCallback} from 'react';

import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService';
import Title from '../../components/Title/Title';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';
import { useLoading } from '../../hooks/useLoading';

export default function PaymentPage(){
    const [order, setOrder] = useState();
    const {isLoading}= useLoading();

    const getOrder = async()=>{
        try {
            const data = await getNewOrderForCurrentUser();
            setOrder(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        console.log(order);
        getOrder();
    },[]);

    if(!order)return<></>;

    return (
        <>
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title="Order Form" fontSize="1.6rem" />
                <div className={classes.summary}>
                    <div>
                        <h3 >Name:</h3>
                        <span>{order.name}</span>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <span>{order.address}</span>
                    </div>
                </div>
                <OrderItemsList order={order} />
            </div>
            <div className={classes.map}>
                <Title title="Your Location" fontSize="1.6rem" />
                <Map readonly={true} location={order.addressLatLng} />
            </div>
            <div className={classes.buttons_container}>
                <div className={classes.buttons}>
                    <PaypalButtons order = {order} />

                </div>
            </div>
        </div>
        </>
    );
};