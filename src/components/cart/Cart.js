import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";

const Cart = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    //initializing states
    const [cart, setCart] = useState([])

    //getting data from context and setting it to current component state
    // once components get mounted
    useEffect(() => {

        if (contextValue.cart) {
            setCart(contextValue.cart)
        }
    },[contextValue.cart])
    return (
        <ul>
            {
                cart.map(product => {
                    return <li key={product.id}>{product.name}</li>
                })
            }
        </ul>
    )
}

export default Cart
