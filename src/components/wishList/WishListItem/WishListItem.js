import React from 'react'
import AddToCartButton from "../../../ui/buttons/addToCart/addToCart";
import DeleteButton from "../../../ui/buttons/delete/DeleteButton";

import Style from './WishListItem.module.css'
import {Link} from "react-router-dom";

const WishListItem = (props) => {
    return(
        <div className={Style.WishListItem}>
            <Link to={props.href}>
                <img src={props.img} alt={props.name} />
            </Link>
            <main>
                <h3>{props.name}</h3>
                <p>in {props.catName}</p>
                <h3>{props.price}</h3>
                <div className={Style.Buttons}>
                    <AddToCartButton
                        AddToCart={Style.CartButton}
                        style={{margin: "2px 8px 2px 0"}}
                        color="white"
                        size="lg"
                        text="ADD TO CART"
                        onCartButtonClickHandler={props.onCartButtonClicked}
                    />
                    <DeleteButton
                        DeleteButton={Style.DeleteButton}
                        style={{margin: "2px 8px 2px 0"}}
                        color="white"
                        size="lg"
                        text="REMOVE FROM WISHLIST"
                        onDeleteButtonClickHandler={props.onRemoveFromWishListButton}
                    />
                </div>
            </main>
        </div>
    )
}

export default WishListItem
