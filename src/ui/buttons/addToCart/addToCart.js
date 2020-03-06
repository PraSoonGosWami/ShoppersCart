import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";


const AddToCart = (props) => {

    //this component is add to cart button used to add products to cart
    return(
        <div className={props.AddToCart} onClick={props.onCartButtonClickHandler} >
            <FontAwesomeIcon style={props.style} icon={faShoppingCart} size={props.size} color={props.color}/>
            <p>{props.text}</p>
        </div>
    )
}

export default AddToCart
