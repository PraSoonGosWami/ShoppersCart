import React, {useContext} from 'react'
import Style from "../Login/Login.module.css"
import LoginVector from '../Login/loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";
import {Redirect} from "react-router";


const SignUp = (props) => {
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
                            <h4>Welcome to Shoppers Cart</h4>
                            <h5>Please Sign Up</h5>
                        </header>
                        <section>
                            <input type="email" placeholder="Email" required/>
                            <input type="name" placeholder="Name" required/>
                            <input type="password" placeholder="Password" required/>
                            <input type="tel" placeholder="Mobile Number" required/>
                            <label>
                                <input type="checkbox"/>
                                I have read all <Link to="/tc" style={{color: "#2FCE98"}}>terms & conditions</Link>
                            </label>
                            <div className={Style.ButtonDiv}>
                                <button>Sign Up</button>
                            </div>
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

export default SignUp
