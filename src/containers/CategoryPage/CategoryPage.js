import React, {useContext, useEffect, useState} from 'react'
import {withRouter} from "react-router";
import Style from './Category.module.css'
import Axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'
import CategoryListView from './categoryListView/categoryListView'
import {AppContext} from "../../context/AppContext";
import {useToasts} from "react-toast-notifications";
import Backdrop from '../../ui/backdrop/backdrop'

const AppFooter = React.lazy(() => import( "../../ui/AppFooter/AppFooter"))

const CategoryPage = (props) => {
    //initializing states
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [catName, setCatName] = useState("Loading...")
    const [adding, setAdding] = useState(false)

    //getting cat id from url
    const catId = props.match.params.cid

    //getting context value
    const contextValue = useContext(AppContext)

    //toast notification
    const {addToast} = useToasts()

    //getting data from backend once components get mounted
    useEffect(() => {
        //getting all the products for single category
        Axios.get("/products/" + catId + ".json")
            .then(response => {
                setProducts(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                addToast("Something went wrong!Please try again", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })


        //getting the category name
        Axios.get("/categories/" + catId + "/catName.json")
            .then(response => {
                setCatName(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                addToast("Something went wrong!Please try again", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setIsLoading(false)

            })
    },[products,catId,addToast])

    // add to cart button click handler
    const onAddToCartButtonClickedListener = (pid) => {
        //setting clicked product to cart context
        contextValue.setCart(prevState => prevState.concat(products[pid]))
        //storing current cart to database if user is logged in
        if (contextValue.isLoggedIn) {

        }
    }



    //add to wishlist button click handler
    const onAddToWishListButtonClickedListener = (pid) => {
        //storing current wishlist to database if user is logged in
        if(contextValue.isLoggedIn){
            //send data to database
            setAdding(true)
            const data = {
                name:products[pid].name,
                catName:products[pid].catName,
                pid: products[pid].id,
                cid: products[pid].category,
                price: "₹"+Math.round(products[pid].price - ((products[pid].price) * (products[pid].discount / 100)))
                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                img:products[pid].url
            }
            const url = `/wishlist/${contextValue.user.uid}/${contextValue.user.uid+pid}.json`
            Axios.put(url,data)
                .then(response=>{
                    setAdding(false)
                    addToast("Product successfully added to your wish list!" , {
                        appearance: 'success',
                        autoDismiss: true,
                    })

                })
                .catch(error=>{
                    setAdding(false)
                    addToast("Something went wrong!Please try again", {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
        }
    }

    //init. spinner product list and footer
    let spinner = <Spinner/>
    let productList = null
    let footer = null

    //populating product list with downloaded data
    if (!isLoading) {
        spinner = null
        if (products) {
            productList = Object.keys(products)
                .map((pid) => {
                    return (
                        <CategoryListView
                            key={pid}
                            href={catId + "/" + pid}
                            url={products[pid]["url"]}
                            name={products[pid]["name"]}
                            catName={products[pid]["catName"]}
                            price={products[pid]["price"]}
                            color={products[pid]["color"]}
                            discount={parseInt(products[pid]["discount"])}
                            onCartButtonClickHandler={() => onAddToCartButtonClickedListener(pid)}
                            onClickHandler={()=>onAddToWishListButtonClickedListener(pid)}
                        />
                    )
                })
            footer = <AppFooter/>
        } else {
            productList = <h4>Oops!! Something went wrong</h4>
        }
    }

    return (
        <div className={Style.CategoryPage}>
            <Backdrop show={adding}/>
            {spinner}
            <h3>{catName}</h3>
            <div className={Style.CategoryPageListHolder}>
                {productList}
            </div>
            {footer}
        </div>
    )

}

export default withRouter(CategoryPage)
