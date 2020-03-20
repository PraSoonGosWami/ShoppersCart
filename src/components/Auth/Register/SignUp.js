import React, {useContext, useState} from 'react'
import Style from "../Login/Login.module.css"
import LoginVector from '../Login/loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {AppContext} from "../../../context/AppContext";
import {Redirect} from "react-router";
import LoadModal from "../../../ui/LoadModal/LoadModal";
import { useToasts } from 'react-toast-notifications'
import Firebase from "../../../config/FirebaseConfig";
import axiosInstance from "../../../AxiosInstance";



const SignUp = (props) => {
    //getting context value
    const contextValue = useContext(AppContext)

    //setting states for login and password input
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [name,setName] = useState("")
    const [progress, setProgress] = useState(false)

    //toast notification
    const {addToast} = useToasts()

    //
    //name handler
    const nameHandler = (event) => {
        setName(event.target.value)
    }
    //psd handler
    const psdHandler = (event) => {
        setPassword(event.target.value)
    }
    //email handler
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    //phone handler
    const phoneHandler = (event) => {
        setPhone(event.target.value)
    }


    //signup method
    const signup = () => {
        if(email.length ===0){
            return addToast("Please enter email", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }
        if(name.length <= 2){
            return addToast("Name too short", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }
        if(password.length ===0){
            return addToast("Please enter a password", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }

        if(password.length <= 5){
            return addToast("Password must be of at least 6 characters", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }

        if(phone.length ===0){
            return addToast("Please enter phone number", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }
        if(phone.length !== 10){
            return addToast("Please enter a valid phone number", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }if(!/^\d+$/.test(phone)){
            return addToast("Please enter a valid phone number", {
                appearance: 'error',
                autoDismiss: true,
                placement:"top-center"
            })
        }
        setProgress(true)
        Firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res=>{
                const user = Firebase.auth().currentUser
                user.updateProfile(
                   { displayName: name.split(" ")[0]}
                ).then(res=>{
                    const data = {name,email,phone,uid:user.uid}
                    axiosInstance.put(`/users/${user.uid}.json`,data)
                        .then(res=>{
                            addToast("Registration successful! Welcome "+name, {
                                appearance: 'success',
                                autoDismiss: true,
                                placement:"top-center"
                            })
                            setProgress(false)
                        })
                        .catch(err=>{
                            addToast(err.message, {
                                appearance: 'error',
                                autoDismiss: true,
                                placement:"top-center"
                            })
                            setProgress(false)

                        })
                })
            })
            .catch(err=>{
                addToast(err.message, {
                    appearance: 'error',
                    autoDismiss: true,
                    placement:"top-center"
                })
                setProgress(false)

            })
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
                               <h4>Welcome to Shoppers Cart</h4>
                               <h5>Please Sign Up</h5>
                           </header>
                           <form onSubmit={(event) => event.preventDefault() }>
                               <input type="email" placeholder="Email" required value={email}
                                      onChange={(event) => emailHandler(event)}/>
                               <input type="name" placeholder="Name" required value={name}
                                      onChange={(event) => nameHandler(event)}/>
                               <input type="password" placeholder="Password" required value={password}
                                      onChange={(event) => psdHandler(event)}/>
                               <input type="tel" placeholder="Mobile Number" required value={phone}
                                      onChange={(event) => phoneHandler(event)}/>
                               <button onClick={signup}>Sign Up</button>

                           </form>
                       </main>
                   </div>
               </AuthModal>
           </React.Fragment>
        )
    }

    // redirecting accidental visit of logged in user to home page
    else{
        return <Redirect to={"/"}/>
    }
}

export default SignUp
