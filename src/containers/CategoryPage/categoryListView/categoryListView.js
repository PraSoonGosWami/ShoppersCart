import React from 'react'
import Style from './categoryListView.module.css'
import {Link} from "react-router-dom";
import AddToCartButton from '../../../ui/buttons/addToCart/addToCart'
import AddToFavouriteButton from '../../../ui/buttons/addToFavourite/addToFavourite'

const categoryListView = (props) => {
    let price = Math.round(props.price - ((props.price) * (props.discount / 100)))
        .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


    return (
        <div className={Style.CategoryListItem}>
            <Link className={Style.CategoryListView} to={"/products/" + props.href}>
                <section className={Style.CategoryListImage}>
                    <img src={props.url} alt={props.name}/>
                </section>

                <section className={Style.CategoryListDetails}>
                    <h4>{props.name + " (" + props.color + ")"}</h4>
                    <p>in {props.catName} </p>
                    <h4><span>₹</span>{price + "\t"}</h4>
                    <h4 style={{color: "#BBBBBB", fontSize: "0.9em"}}><del>₹{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }</del>
                        {"\t\t("+props.discount+"% off)"}</h4>
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
