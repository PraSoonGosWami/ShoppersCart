import React, {useState, useEffect, useContext} from 'react'
import {useHistory, useParams} from "react-router";
import Carousel from "nuka-carousel";
import axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'
import Style from './productPage.module.css'
import AddToFavouriteButton from "../../ui/buttons/addToFavourite/addToFavourite";
import AddToCartButton from "../../ui/buttons/addToCart/addToCart";
import {AppContext} from "../../context/AppContext";
import AppFooter from "../../ui/AppFooter/AppFooter";
import {useToasts} from "react-toast-notifications";
import LoadModal from "../../ui/LoadModal/LoadModal";
import addToCartFunction from "../../helper/addToCartFunction";
import addToWishListFunction from "../../helper/addToWishListFunction";
import dataModel from "../../helper/dataModel";
import ProductHolder from "../HomePage/HomePageProducts/homeProductHolder/homeProductHolder";
import ProductCard from "../HomePage/HomePageProducts/productCard/productCard";


const ProductPage = (props) => {
    //initializing states
    const [product, setProduct] = useState(null)
    const [sProducts, setSProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [adding, setAdding] = useState(false)


    //getting category id  and product id from url
    const cid = useParams()["cid"]
    const pid = useParams()["pid"]
    // setting the URL
    const url = "/products/" + cid + "/" + pid + ".json"

    //getting context value
    const contextValue = useContext(AppContext)

    //toast notification
    const {addToast} = useToasts()

    const history = useHistory()

    //getting data from backend once components get mounted
    useEffect(() => {
        //getting the products
        axios.get(url)
            .then(response => {
                setIsLoading(false)
                setProduct(response.data)
            })
            .catch(error => {
                setIsLoading(false)
            })

        axios.get("/products/" + cid+'.json')
            .then(res => {
                setSProducts(res.data)
            })
            .catch(error => {
            })

    }, [url])

    // add to cart button click handler
    const onAddToCartButtonClickedListener = () => {

        addToCartFunction(dataModel(product), contextValue, addToast, setAdding)

    }

    //add to wishlist button click handler
    const onAddToWishListButtonClickedListener = () => {
        addToWishListFunction(contextValue, setAdding, product, addToast)
    }


    //init. spinner product list and footer
    let spinner = <Spinner/>
    let productView = null
    let footer = null
    let similarProducts = null
    //populating product view with downloaded data
    if (!isLoading) {
        spinner = null
        if (product && sProducts) {
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
                                    onCartButtonClickHandler={onAddToCartButtonClickedListener}
                                />
                                <AddToFavouriteButton
                                    AddToFavourite={Style.ButtonWish}
                                    style={{margin: "2px 8px 2px 0"}}
                                    color="#ff2725"
                                    size="lg"
                                    text="ADD TO WISH LIST"
                                    onClickHandler={onAddToWishListButtonClickedListener}
                                />

                            </div>


                        </section>
                    </header>
                    <article>
                        <h2>Product Details</h2>
                        <p>{product.details}</p>
                    </article>
                    <ProductHolder
                        onClick={() => history.push('/category/' + cid)}
                        title={"Similar products"}>
                        {Object.keys(sProducts)
                            .map((pId, index) => {
                                if (index < 5 && pId !== pid)
                                    return (
                                        <ProductCard
                                            onClick={()=>{
                                                history.push('/products/'+cid+'/'+pId)
                                                window.scroll(0,0)
                                            }}
                                            key={pId}
                                            src={sProducts[pId].url}
                                            name={sProducts[pId].name}
                                            details={sProducts[pId].details}
                                            price={sProducts[pId].price}
                                            discount={parseInt(sProducts[pId].discount)}
                                        />
                                    )
                                else
                                    return null
                            })}
                    </ProductHolder>

                </div>
            )
            footer = <AppFooter/>
        } else {
            productView = <h2> Oops!! Seems like content you are searching for is unavailable</h2>
        }
    }

    return (
        <React.Fragment>
            <LoadModal show={adding}/>
            {spinner}
            {productView}
            {footer}
        </React.Fragment>
    )
}

export default ProductPage
