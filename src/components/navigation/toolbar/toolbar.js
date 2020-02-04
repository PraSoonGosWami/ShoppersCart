import React from 'react'
import Style from './toolbar.module.css'
import Logo from '../../../ui/logo/logo'
import SearchBar from '../../../ui/search/search'
import CartIcon from '../cartButton/cartButton'
import SignInButton from "../signinbutton/signInButton";
import {NavLink} from "react-router-dom";

const toolbar = (props) => {
    return(
        <div className={Style.Toolbar}>
            <Logo menuClicked={props.onMenuButtonClicked}/>
            <SearchBar/>
            <nav className={Style.Element}>
                <SignInButton style={Style.nav} active={Style.active}/>
                <CartIcon size='lg' style={Style.nav}/>
            </nav>
        </div>

    )
}

export default toolbar
