import React from 'react'
import Style from './logo.module.css'
import AppLogo from './logo.png'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faShoppingCart,faSortNumericUpAlt} from "@fortawesome/free-solid-svg-icons";

const logo = (props) => {
    return(
        <div className={Style.Logo}>
            <FontAwesomeIcon className={Style.Hamburger} icon={faBars} size="lg" onClick={props.menuClicked}/>
            <NavLink to='/'><img src={AppLogo}/></NavLink>
            <NavLink className={Style.Hamburger} to="/cart" exact><FontAwesomeIcon icon={faShoppingCart} size="lg" /></NavLink>

        </div>
    )
}

export default logo
