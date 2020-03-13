import React, {useContext, useEffect, useState} from 'react'
import Style from './MyOrders.module.css'
import {AppContext} from "../../context/AppContext";
import {Redirect} from "react-router";
import axiosInstance from "../../AxiosInstance";
import Spinner from "../../ui/spinner/spinner";
import OrderList from "./orderList/OrderList";

const MyOrders = (props) => {

    const [order , setOrder] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const contextValue = useContext(AppContext)


    useEffect(()=>{
        if(contextValue.user){
            //setIsLoading(true)
            const url = `/myorders/${contextValue.user.uid}.json`
            axiosInstance.get(url)
                .then(response => {
                    setOrder(response.data)
                    setIsLoading(false)
                })
                .catch(err=>{
                    setIsLoading(false)
                })
        }
    },[contextValue.user])

    if(!contextValue.isLoggedIn){
        return <Redirect to={'/signin?from=orders'}/>
    }

    return(
        <React.Fragment>
            {isLoading && <Spinner/>}
            {order && <div className={Style.MyOrders}>
                <h3>Order history</h3>
                <section>
                    {Object.keys(order).map(index=>{
                        return <OrderList
                            key={index}
                            date={order[index].date}
                            orderId={order[index].orderId}
                            price={order[index].price}
                            items={order[index].item}
                        />
                    })}
                </section>
            </div>}
            {!order && !isLoading && <h3>You dont have any orders</h3> }
        </React.Fragment>

    )
}

export default MyOrders
