import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";

const WishList = (props) => {
    const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(AuthContext)
    if (!isLoggedIn) {
        return (
            <Redirect to={"/signin"}/>
        )
    }
    else
        return <h2>Wish List</h2>
}

export default WishList
