import React, {useContext} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faShoppingBag, faHeart, faShoppingCart, faTag, faPowerOff,faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
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
    }else{
        logout = (
            <Link to="/signin"  exact='true' className={Style.ProfileSection}>
                <FontAwesomeIcon icon={faSignInAlt} size={props.size} className={Style.icon} />
                <p className={Style.description}>Sign In</p>
            </Link>
        )
    }





    return(
        <section className={Style.UserSection}>

            <Link to="/profile"  exact={"true"} className={Style.ProfileSection}>
                <FontAwesomeIcon icon={faUser} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Account</p>
            </Link>

            <Link to="/orders"  exact={"true"} className={Style.ProfileSection}>
                <FontAwesomeIcon icon={faShoppingBag} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Orders</p>
            </Link>

            <Link to="/wishlist"  exact={"true"} className={Style.ProfileSection} >
                <FontAwesomeIcon icon={faHeart} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Wish list</p>
            </Link>

            <Link to="/cart"  exact={"true"} className={Style.ProfileSection}>
                <FontAwesomeIcon icon={faShoppingCart} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Cart</p>
            </Link>

            <Link to="/profile/#coupon"  exact={"true"} className={Style.ProfileSection}>
                <FontAwesomeIcon icon={faTag} size={props.size} className={Style.icon} />
                <p className={Style.description}>My Coupons</p>
            </Link>

            {logout}


        </section>
    )
}

export default ProfileSection
