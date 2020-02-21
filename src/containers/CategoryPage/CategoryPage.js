import React, {useContext, useEffect, useState} from 'react'
import {withRouter} from "react-router";
import Style from './Category.module.css'
import Axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'
import CategoryListView from './categoryListView/categoryListView'
import {AppContext} from "../../context/AppContext";

const AppFooter = React.lazy(() => import( "../../ui/AppFooter/AppFooter"))

const CategoryPage = (props) => {
    //initializing states
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [catName, setCatName] = useState("Loading...")

    //getting cat id from url
    const catId = props.match.params.cid

    //getting context value
    const contextValue = useContext(AppContext)

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
                console.log(error)
            })


        //getting the category name
        Axios.get("/categories/" + catId + "/catName.json")
            .then(response => {
                setCatName(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)

            })
    })

    // add to cart button click handler
    const onAddToCartButtonClickedListener = (pid) => {
        //setting clicked product to cart context
        contextValue.setCart(prevState => prevState.concat(products[pid]))
        //storing current cart to database if user is logged in
        if (contextValue.isLoggedIn) {

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
                            onClickHandler={() => onAddToCartButtonClickedListener(pid)}
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
            <h3>{catName}</h3>
            <div className={Style.CategoryPageListHolder}>
                {productList}
            </div>
            {footer}
        </div>
    )

}

export default withRouter(CategoryPage)
