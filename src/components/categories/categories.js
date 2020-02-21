import React from 'react'
import Style from './categories.module.css'
import {NavLink} from "react-router-dom"

const categories = (props) => {

    //this component displays all categories on the home page
    return(
        <div className={Style.Categories}>
            <NavLink to={"/category/"+props.catId} exact className={Style.Link}>
                <img src={props.catImg} alt={props.catName} className={Style.CategoryImage}/>
                <p className={Style.CategoryName}>{props.catName}</p>
            </NavLink>
        </div>
    )
}

export default categories
