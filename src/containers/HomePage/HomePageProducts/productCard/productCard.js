import React from 'react'
import Style from './productCard.module.css'
const productCard = (props) => {
    return(
        <div className={Style.ProductCard} onClick={props.onClick}>
            <header>
                <img src={props.src} alt={props.name}/>
            </header>
            <section>
                <h5>{props.name}</h5>
                <p>{props.details}</p>
                <h5><span>₹</span> {props.price}</h5>
            </section>
        </div>
    )
}

export default productCard
