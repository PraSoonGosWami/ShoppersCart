import React, {useContext, useEffect, useState} from 'react'
import Style from './MyOrders.module.css'
import {AppContext} from "../../context/AppContext";
import {Redirect} from "react-router";
import axiosInstance from "../../AxiosInstance";
import Spinner from "../../ui/spinner/spinner";
import OrderList from "./orderList/OrderList";

const MyOrders = (props) => {

    const [order , setOrder] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const contextValue = useContext(AppContext)


    useEffect(()=>{
        if(contextValue.user){
            //setIsLoading(true)
            const url = `/myorders/${contextValue.user.uid}.json`
            axiosInstance.get(url)
                .then(async response => {
                    const data = Object.keys(response.data).map(id=>{
                        return response.data[id]
                    })
                    await data.sort((a,b)=>{
                        const d1 = a.date.split('/')
                        const d2 = b.date.split('/')
                        const date = new Date(d1[2],parseInt(d1[1])-1,d1[0])
                        const date2 = new Date(d2[2],parseInt(d2[1])-1,d2[0])
                        return date2 - date
                    })
                    setOrder(data)
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
                    {order.map(item=>{
                        return <OrderList
                            key={item.orderId}
                            date={item.date}
                            orderId={item.orderId}
                            price={item.price}
                            items={item.item}
                        />
                    })}
                </section>
            </div>}
            {!order && !isLoading && <h3>You dont have any orders</h3> }
        </React.Fragment>

    )
}

export default MyOrders
