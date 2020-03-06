import React, {useContext, useState} from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {Redirect, useHistory, useLocation} from "react-router";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";
import Firebase from "../../../config/FirebaseConfig";
import { useToasts } from 'react-toast-notifications'



const Login = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    //setting states for login and password input
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {addToast} = useToasts()



    //using route history to redirect back when logged in
    const history = useHistory()
    const location = useLocation()

    //firebase login method
    const login = () => {
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                history.goBack()
            })
            .catch((error => {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                    placement:"top-center"
                })
            }))
    }

    //email
    const onEmailChangedListener = (event) => {
        setEmail(event.target.value)
    }

    //password
    const onPsdChangedListener = (event) => {
        setPassword(event.target.value)
    }

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
                            <input type="email" placeholder={"Email"} value={email}
                                   onChange={onEmailChangedListener}/>
                            <input type="password" placeholder={"Password"} value={password}
                                   onChange={onPsdChangedListener}/>
                            <button onClick={login}>Sign In</button>
                            <h5 className={Style.ForgetPassword}>Forgot password? </h5>
                            <h5>Don't have an account? <Link to={"/signup"}
                                                             style={{textDecoration: "none", color: "#2FCE98"}}>Sign
                                Up</Link> here</h5>

                        </section>
                    </main>
                </div>
            </AuthModal>
        )
    }

    // redirecting accidental visit of logged in user to home page
    else {
        return <Redirect to={"/"+new URLSearchParams(location.search).get("from")}/>
    }


}

export default Login
