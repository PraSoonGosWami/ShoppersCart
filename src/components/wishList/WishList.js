import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";
import Style from './WishList.module.css';

const WishList = (props) => {
    const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(AuthContext)
    if (!isLoggedIn) {
        return (
            <Redirect to={"/signin"}/>
        )
    }
    else
        return (
            <div className="flex-container">
                <div>
                    <img src="Fossil Sport.jpg" alt="Fossil Sport Image"/>
                </div>
                <div>
                    <h2>Fossil Sport for Men 43mm Black Color</h2>
                    <h2>Rs. 11995 <strike><h3>Rs. 18000</h3></strike></h2>
                </div>
            </div>
        )
}

export default WishList
