import React, {useContext} from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";

const Login = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    // returning login pop up if user is not logged in
    if (!contextValue.isLoggedIn) {
        return (
            <AuthModal>
                <div className={Style.Login}>
                    <aside>
                        <img src={LoginVector} alt=""/>
                    </aside>
                    <main>
                        <header>
                            <img src={Logo} alt="App Logo"/>
                            <h4>Welcome Back</h4>
                            <h5>Please Login to continue</h5>
                        </header>
                        <section>
                            <input type="email" placeholder={"Email"}/>
                            <input type="password" placeholder={"Password"}/>
                            <button>Sign In</button>
                            <h5>Don't have an account? <Link to={"/signup"}>Sign Up</Link> here</h5>

                        </section>
                    </main>
                </div>
            </AuthModal>
        )
    }

    // redirecting accidental visit of logged in user to home page
    else{
        return <Redirect to={"/"}/>
    }


}

export default Login
