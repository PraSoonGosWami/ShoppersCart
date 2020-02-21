import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faShoppingBag, faHeart, faShoppingCart, faTag} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import Style from './profileSection.module.css'


//this component contains links to different pages for logged in user
//used in side bar
const profileSection = (props) => {
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

        </section>
    )
}

export default profileSection
