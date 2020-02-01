import React from 'react'
import Style from './toolbar.module.css'
import Logo from '../../../ui/logo/logo'
import SearchBar from '../../../ui/search/search'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser,faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

const toolbar = (props) => {
    return(
        <div className={Style.Toolbar}>
            <Logo menuClicked={props.onMenuButtonClicked}/>
            <SearchBar/>
            <nav className={Style.Element}>
                <NavLink className={Style.nav} to="/profile" activeClassName={Style.active} exact><FontAwesomeIcon icon={faUser} size="2x" /></NavLink>
                <NavLink className={Style.nav} to="/cart" activeClassName={Style.active} exact><FontAwesomeIcon icon={faShoppingCart} size="2x" /></NavLink>
            </nav>
        </div>

    )
}

export default toolbar
