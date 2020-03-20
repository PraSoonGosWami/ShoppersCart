import React, {useContext} from 'react'
import {NavLink} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";
import ProfileSection from '../profileSection/profileSection'
import Style from './signInButton.module.css'

const SignInButton = (props) => {


    const contextVal = useContext(AppContext)
    let displayVal = <NavLink to="/signin" className={Style.SignInButton}><h4>Sign In</h4></NavLink>
    if (contextVal.isLoggedIn) {
        if (contextVal.user) {
            if (contextVal.user.displayName) {
                displayVal = (
                    <div className={Style.Dropdown}>
                        <h4>{`Hi! ${contextVal.user.displayName} `} &#x25BC;</h4>
                        <div className={Style.DropdownContent}>
                            <ProfileSection/>
                        </div>
                    </div>
                )
            }else{
                displayVal = (
                    <div className={Style.Dropdown}>
                        <h4>{`Hello!`}</h4>
                        <div className={Style.DropdownContent}>
                            <ProfileSection/>
                        </div>
                    </div>
                )
            }
        }

    }

    return (
        <React.Fragment>
            {displayVal}
        </React.Fragment>
    )


}

export default SignInButton