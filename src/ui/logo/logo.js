import React from 'react'
import Style from './logo.module.css'
import AppLogo from './logo.png'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import CartIcon from '../../components/navigation/cartButton/cartButton'


const logo = (props) => {
    return(
        <div className={Style.Logo}>
            <FontAwesomeIcon className={Style.Hamburger} icon={faBars} size="lg" onClick={props.menuClicked}/>
            <NavLink to='/'><img src={AppLogo} alt='logo'/></NavLink>
            <CartIcon size='lg' style={Style.CartIcon}/>
        </div>
    )
}

export default logo
