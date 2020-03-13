import React from 'react'
import Style from "./CartItem.module.css";
import {Link} from "react-router-dom";
import DeleteButton from "../../../ui/buttons/delete/DeleteButton";

const CartItem = (props) => {
    return(
        <div className={Style.CartItem}>

            <Link to={props.href}>
                <img src={props.img} alt={props.name} />
            </Link>
            <main>
                <h3>{props.name}</h3>
                <p>in {props.catName}</p>
                <h3>{props.price}</h3>

            </main>
             <DeleteButton
                style={{margin: "2px 8px 2px 0"}}
                color="#ed413e"
                size="lg"
                onDeleteButtonClickHandler={props.onRemoveFromCartButton}
            />
        </div>

    )
}

export default CartItem
