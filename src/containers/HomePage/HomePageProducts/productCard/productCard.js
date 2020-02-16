import React from 'react'
import Style from './productCard.module.css'
const productCard = (props) => {
    const price = Math.round(props.price - ((props.price) * (props.discount / 100)))
        .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return(
        <div className={Style.ProductCard} onClick={props.onClick}>
            <header>
                <img src={props.src} alt={props.name}/>
            </header>
            <section>
                <h5>{props.name}</h5>
                <p>{props.details}</p>
                <h5><span>₹</span>{price + "\t"}</h5>
                <h5 style={{color: "#ff4238"}}><del>₹{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</del>
                    {"\t\t("+props.discount+"% off)"}</h5>
            </section>
        </div>
    )
}

export default productCard
