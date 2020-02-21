import React, {useState, useEffect, useContext} from 'react'
import {useParams} from "react-router";
import Carousel from "nuka-carousel";
import axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'
import Style from './productPage.module.css'
import AddToFavouriteButton from "../../ui/buttons/addToFavourite/addToFavourite";
import AddToCartButton from "../../ui/buttons/addToCart/addToCart";
import {AppContext} from "../../context/AppContext";
import AppFooter from "../../ui/AppFooter/AppFooter";


const ProductPage = (props) => {
    //initializing states
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //getting category id  and product id from url
    const cid = useParams()["cid"]
    const pid = useParams()["pid"]
    // setting the URL
    const url = "/products/" + cid + "/" + pid + ".json"

    //getting context value
    const contextValue = useContext(AppContext)

    //getting data from backend once components get mounted
    useEffect(() => {
        //getting the products
        axios.get(url)
            .then(response => {
                setIsLoading(false)
                setProduct(response.data)
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false)
            })
    }, [])

    // add to cart button click handler
    const onAddToCartButtonClickedListener = () => {
        //setting clicked product to cart context
        contextValue.setCart(prevState => prevState.concat(product))
        //alert("Product added to cart")

        //storing current cart to database if user is logged in
        if(contextValue.isLoggedIn){
            //send data to backend
        }
    }

    //init. spinner product list and footer
    let spinner = <Spinner/>
    let productView = null
    let footer = null

    //populating product view with downloaded data
    if (!isLoading) {
        spinner = null
        if (product) {
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
                            <h2>{product.name + " (" + product.color + ")"}</h2>
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

                                <AddToCartButton
                                    AddToCart={Style.ButtonCart}
                                    style={{margin: "2px 8px 2px 0"}}
                                    color="#2FCE98"
                                    size="lg"
                                    text="ADD TO CART"
                                    onClickHandler={onAddToCartButtonClickedListener}
                                />
                                <AddToFavouriteButton
                                    AddToFavourite={Style.ButtonWish}
                                    style={{margin: "2px 8px 2px 0"}}
                                    color="#ff2725"
                                    size="lg"
                                    text="ADD TO WISH LIST"
                                />

                            </div>


                        </section>
                    </header>
                    <article>
                        <h2>Product Details</h2>
                        <p>{product.details}</p>
                    </article>
                </div>
            )
            footer = <AppFooter/>
        }
        else{
           productView = <h2> Oops!! Seems like content you are searching for is unavailable</h2>
        }
    }

    return (
        <React.Fragment>
            {spinner}
            {productView}
            {footer}
        </React.Fragment>
    )
}

export default ProductPage
