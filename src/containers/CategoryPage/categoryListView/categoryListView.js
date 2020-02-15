import React from 'react'
import Style from './categoryListView.module.css'
import {Link} from "react-router-dom";
import AddToCartButton from '../../../ui/buttons/addToCart/addToCart'
import AddToFavouriteButton from '../../../ui/buttons/addToFavourite/addToFavourite'

const categoryListView = (props) => {
    return (
        <div className={Style.CategoryListItem}>
            <Link className={Style.CategoryListView} to={"/products/" + props.href}>
                <section className={Style.CategoryListImage}>
                    <img src={props.url} alt={props.name}/>
                </section>

                <section className={Style.CategoryListDetails}>
                    <h4 >{props.name+" ("+props.color+")"}</h4>
                    <p>in {props.catName} </p>
                    <h4><span>₹</span>{props.price}</h4>
                    <p>{props.details}</p>
                </section>

            </Link>

            <section className={Style.Fav}>
                <AddToFavouriteButton/>
                <AddToCartButton/>
            </section>
        </div>
    )
}

export default categoryListView
