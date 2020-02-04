import React from 'react'
import Style from './categories.module.css'

const categories = (props) => {
    return(
        <div className={Style.Categories} onClick={props.clicked}>
            <img src={props.catImg} alt={props.catName} className={Style.CategoryImage}/>
            <p className={Style.CategoryName}>{props.catName}</p>
        </div>
    )
}

export default categories
