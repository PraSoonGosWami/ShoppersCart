import React from 'react'
import {NavLink} from "react-router-dom";
import Style from "./cartButton.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const cartButton = (props) => {
    return(
        <NavLink className={props.style} to="/cart" activeClassName={Style.active} exact>
            <FontAwesomeIcon icon={faShoppingCart} size={props.size} />
            <p className={Style.CartItemCount}>0</p>
        </NavLink>
    )
}

export default cartButton
