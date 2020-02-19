import React, {useState, useEffect} from 'react'
import {useParams} from "react-router";
import Carousel from "nuka-carousel";
import axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'

import Style from './productPage.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart,faHeart} from "@fortawesome/free-solid-svg-icons";


const ProductPage = (props) => {
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const cid = useParams()["cid"]
    const pid = useParams()["pid"]
    const url = "/products/" + cid + "/" + pid + ".json"

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setProduct(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false)
            })
    }, [])

    let spinner = <Spinner/>
    let productView = null
    if (product && !isLoading) {
        spinner = null
        let price = Math.round(product.price - ((product.price) * (product.discount / 100)))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        productView = (
            <div className={Style.ProductPage}>
                <header>
                    <aside>
                        <Carousel wrapAround={true}>
                            <div className={Style.ProductImage}>
                                <img src={product.url} alt={product.name}/>
                            </div>
                        </Carousel>
                    </aside>
                    <section>
                        <h2>{product.name+" ("+product.color+")"}</h2>
                        <h5 style={{margin: "2px", color: "#9d9d9d"}}>in {product.catName}</h5>
                        <p>{product.details}</p>
                        <hr/>
                        <h2 style={{margin: "6px 0px"}}>₹{price}</h2>
                        <h4 style={{color: "#ff2725", fontSize: "0.9em", margin: "0"}}>
                            <del>₹{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }</del>
                            {"\t\t(" + product.discount + "% off)"}</h4>
                        <h6>inclusive of all taxes</h6>

                        <div className={Style.ButtonDiv}>
                           <span className={Style.ButtonCart}>
                                <FontAwesomeIcon icon={faShoppingCart} color="#2FCE98" size="lg" style={{margin:"2px 8px 2px 0"}}/>
                                <p>ADD TO CART</p>
                           </span>
                            <span className={Style.ButtonWish}>
                                <FontAwesomeIcon icon={faHeart} color="#ff2725" size="lg" style={{margin:"2px 8px 2px 0"}}/>
                                <p>ADD TO WISH LIST</p>
                           </span>
                        </div>


                    </section>
                </header>
                <article>
                    <h2>Product Details</h2>
                    <p>{product.details}</p>
                </article>
            </div>
        )
    }

    return (
        <React.Fragment>
            {spinner}
            {productView}
        </React.Fragment>
    )
}

export default ProductPage
