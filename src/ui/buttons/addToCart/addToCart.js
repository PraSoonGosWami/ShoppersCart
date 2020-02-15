import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import Style from './addToCart.module.css'

const addToCart = (props) => {
    return(
        <div className={Style.AddToCart}>
            <FontAwesomeIcon className={Style.AddToCartIcon} icon={faShoppingCart} size="sm"/>
            <h6>Add to cart</h6>
        </div>
    )
}

export default addToCart
