import React, {useContext} from 'react'
import {AppContext} from "../../context/AppContext";
import {Redirect} from "react-router";

const WishList = (props) => {
    const contextVal = useContext(AppContext)
    if (!contextVal.isLoggedIn) {
        return (
            <Redirect to={"/signin"}/>
        )
    }
    else
        return <h2>Wish List</h2>
}

export default WishList
