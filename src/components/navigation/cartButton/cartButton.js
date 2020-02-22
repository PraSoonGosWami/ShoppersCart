import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import Style from "./cartButton.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../context/AppContext";


// this component show in the tool bar
// which has a link to cart page
// and shows number of items in cart

const CartButton = (props) => {
    //getting context value
    const contextValue = useContext(AppContext)

    //initializing state
    const [cartLen,setCartLen] = useState(0)

    //getting data from context to set total number of products in cart  once components get mounted
    useEffect(()=>{
        if(contextValue.cart) {
            setCartLen(contextValue.cart.length)
        }
    },[contextValue.cart])
    return(
        <NavLink className={props.style} to="/cart" activeClassName={Style.active} exact>
            <FontAwesomeIcon icon={faShoppingCart} size={props.size} />
            <p className={Style.CartItemCount}>{cartLen}</p>
        </NavLink>
    )
}

export default CartButton
