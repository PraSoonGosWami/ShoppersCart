import React, {useContext, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faShoppingBag, faHeart, faShoppingCart, faTag, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import Style from './profileSection.module.css'
import {AppContext} from "../../../context/AppContext";
import Firebase from "../../../config/FirebaseConfig";


//this component contains links to different pages for logged in user
//used in side bar
const ProfileSection = (props) => {

    //getting context value
    const contextVal = useContext(AppContext)
    let logout = null

    //checking if user is logged in
    if(contextVal.isLoggedIn){
        const userLogout = () =>{
            Firebase.auth().signOut()
        }
        logout = (
            <div className={Style.ProfileSection} onClick={userLogout} >
                <FontAwesomeIcon icon={faPowerOff} size={props.size} className={Style.icon} />
                <p className={Style.description}>Logout</p>
            </div>
        )
    }





    return(
        <section className={Style.UserSection}>

            <NavLink to="/profile"  exact className={Style.ProfileSection} activeClassName={Style.active}>
                <FontAwesomeIcon icon={faUser} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Account</p>
            </NavLink>

            <NavLink to="/orders"  exact className={Style.ProfileSection} activeClassName={Style.active}>
                <FontAwesomeIcon icon={faShoppingBag} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Orders</p>
            </NavLink>

            <NavLink to="/wishlist"  exact className={Style.ProfileSection} activeClassName={Style.active}>
                <FontAwesomeIcon icon={faHeart} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Wish list</p>
            </NavLink>

            <NavLink to="/cart"  exact className={Style.ProfileSection} activeClassName={Style.active}>
                <FontAwesomeIcon icon={faShoppingCart} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Cart</p>
            </NavLink>

            <NavLink to="/profile/#coupon"  exact className={Style.ProfileSection} activeClassName={Style.active}>
                <FontAwesomeIcon icon={faTag} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Coupons</p>
            </NavLink>

            {logout}


        </section>
    )
}

export default ProfileSection
