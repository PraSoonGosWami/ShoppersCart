import React, {useEffect, useContext} from 'react'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";

const SignInDialog = React.lazy(import("../../Auth/Login/Login"))

const SignInButton = (props) => {

    const contextVal = useContext(AuthContext)
    let displayVal = "Sign In"
    if (contextVal.isLoggedIn) {
        displayVal = "Hi! "+ contextVal.user.displayName
    }

    return (
        <NavLink className={props.style} to="/profile" activeClassName={props.active} exact>
            <h4>{displayVal}</h4>
        </NavLink>
    )


}

export default SignInButton