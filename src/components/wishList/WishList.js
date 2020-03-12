import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from "react-router";
import Style from './WishList.module.css';
import Axios from '../../AxiosInstance'
import {AppContext} from "../../context/AppContext";
import Spinner from '../../ui/spinner/spinner'
import WishListItem from "./WishListItem/WishListItem";
import {useToasts} from "react-toast-notifications";
import addToCartFunction from "../../helper/addToCartFunction";
import LoadModal from "../../ui/LoadModal/LoadModal";


const WishList = (props) => {
    const contextVal = useContext(AppContext)

    //init state
    const [wishList, setWishList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [progress,setProgress] = useState(false)

    //toast notification
    const {addToast} = useToasts()

    useEffect(() => {
        //getting wishlist
        if (contextVal.user) {
            const url = `/wishlist/${contextVal.user.uid}.json`
            Axios.get(url)
                .then(response => {
                    setWishList(response.data);
                    if(!wishList)
                        setLoading(false)
                })
                .catch(error => {
                    addToast("Something went wrong!Please try again", {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                    setLoading(false)
                })
        }
    },[addToast,contextVal.user,wishList])

    // add to cart button click handler
    const onAddToCartButtonClickedListener = (id) => {
        addToCartFunction(wishList[id],contextVal,addToast,setProgress)
    }

    // remove item from cart button click handler
    const onRemoveFromWishListButtonClickedListener = (id) => {
        //removes product with wish list id
        if(contextVal.isLoggedIn){
            setProgress(true)
            const url = `/wishlist/${contextVal.user.uid}/${id}.json`
            Axios.delete(url)
                .then(response=>{
                    addToast("Removed successfully", {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    setProgress(false)
                })
                .catch(error=>{
                    addToast("Something went wrong!Please try again", {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                    setProgress(false)
                })
        }


    }


    let spinner = <Spinner/>
    let list = null
    let emptyMsg = null
    if (!loading) {
        spinner = null
        if (wishList) {
            list = (
                <div className={Style.WishList}>
                    <header>
                        <h3>Wish List</h3>
                    </header>
                    {Object.keys(wishList).map(keyId=>{
                        return <WishListItem
                            key={keyId}
                            name={wishList[keyId].name}
                            catName={wishList[keyId].catName}
                            price={wishList[keyId].price}
                            img={wishList[keyId].img}
                            href={`/products/${wishList[keyId].cid}/${wishList[keyId].id}`}
                            onCartButtonClicked={()=>onAddToCartButtonClickedListener(keyId)}
                            onRemoveFromWishListButton={()=>onRemoveFromWishListButtonClickedListener(keyId)}
                        />
                    })}
                </div>
            )
        }
        else {
            emptyMsg = <h3>Oops! Seems like your wish list is empty!</h3>
        }
    }

    return (
        <React.Fragment>
            {!contextVal.isLoggedIn && <Redirect to={"/signin?from=wishlist"}/>}
            <LoadModal show={progress}/>
            {spinner}
            {list}
            {emptyMsg}
        </React.Fragment>
    )

}

export default WishList
