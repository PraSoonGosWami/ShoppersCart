import React, {useContext, useState} from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {Redirect, useHistory, useLocation} from "react-router";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";
import Firebase from "../../../config/FirebaseConfig";
import {useToasts} from 'react-toast-notifications'
import LoadModal from "../../../ui/LoadModal/LoadModal";


const Login = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    //setting states for login and password input
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [progress, setProgress] = useState(false)

    //toast notification
    const {addToast} = useToasts()


    //using route history to redirect back when logged in
    const history = useHistory()
    const location = useLocation()

    //firebase login method
    const login = () => {
        setProgress(true)
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                contextValue.setUser(response.user)
                setTimeout(() => {
                    setProgress(false)
                    if (email === 'admin@shopperscart.com')
                        return history.push('/admin')
                    history.goBack()
                },500)

            })
            .catch((error => {
                setProgress(false)
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                    placement: "top-center"
                })
            }))
    }

    //sends psd reset email to user's registered mail
    const forgotPsdHandler = () => {
        if (email.length === 0) {
            return addToast("Please enter your email in email field to reset password", {
                appearance: 'info',
                autoDismiss: true,
                placement: "top-center"
            })
        }
        setProgress(true)
        Firebase.auth().sendPasswordResetEmail(email)
            .then(res => {
                addToast("We have sent you an password reset link to your registered email", {
                    appearance: 'success',
                    autoDismiss: true,
                    placement: "top-center"
                })
                setProgress(false)
            })
            .catch(err => {
                addToast(err.message, {
                    appearance: 'error',
                    autoDismiss: true,
                    placement: "top-center"
                })
                setProgress(false)

            })
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
            <React.Fragment>
                <LoadModal show={progress}/>
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
                            <form onSubmit={(event) => event.preventDefault()}>
                                <input type="email" placeholder={"Email"} value={email}
                                       onChange={onEmailChangedListener}/>
                                <input type="password" placeholder={"Password"} value={password}
                                       onChange={onPsdChangedListener}/>
                                <button onClick={login}>Sign In</button>
                                <h5 className={Style.ForgetPassword} onClick={forgotPsdHandler}>Forgot password? </h5>
                                <h5>Don't have an account? <Link to={"/signup"} style={{
                                    textDecoration: "none",
                                    color: "#2FCE98"
                                }}>SignUp</Link> here</h5>

                            </form>
                        </main>
                    </div>
                </AuthModal>
            </React.Fragment>

        )
    }

    // redirecting accidental visit of logged in user to home page
    else {
        if (location.search)
            return <Redirect to={"/" + new URLSearchParams(location.search).get("from")}/>
        else
            return <Redirect to={"/"}/>

    }


}

export default Login
