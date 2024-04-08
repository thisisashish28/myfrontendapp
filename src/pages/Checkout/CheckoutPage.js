import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderService';
import classes from './checkoutPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';

export default function CheckoutPage(){
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({...cart});
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const submit = async data =>{
        if(!order.addressLatLng){
            toast.warning('Please select your loaction on the map');
            return;
        }

        const resp = await createOrder({...order, name: data.name, address: data.address});
        console.log(resp);
        navigate('/payment');
    };
    return (
       <>
       <form 
       onSubmit = {handleSubmit(submit)}
       className={classes.container}
       >
        <div className={classes.content}>
            <Title title="Order Form" fontSize="1.6rem" />
            <div className={classes.input}>
                <Input 
                defaultValue={user.name}
                label="Name"
                {...register('name')}
                error={errors.name}
                />
                <Input 
                defaultValue={user.address}
                label="Address"
                {...register('address')}
                error={errors.address}
                />
            </div>
            <OrderItemsList order={order} />
        </div>
        <div>
            <Title title="Choose Your Location" fontSize="1.6rem" />
            <Map
            location={order.addressLatLng}
            onChange={latlng =>{
                console.log(latlng);
                setOrder({...order, addressLatLng:latlng});
            }}
            />
        </div>
        <div className={classes.buttons_container}>
            <div className={classes.buttons}>
                <Button
                type="submit"
                text="Go to Payment"
                width="100%"
                height="3rem"
                />
            </div>

        </div>
       </form>
       </>
    );
};