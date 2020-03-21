import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import {Redirect} from "react-router";
import Style from './UserProfile.module.css'
import axiosInstance from "../../AxiosInstance";
import {useToasts} from 'react-toast-notifications'
import Spinner from "../../ui/spinner/spinner";
import LoadModal from "../../ui/LoadModal/LoadModal";
import Firebase from "../../config/FirebaseConfig";
import AppFooter from "../../ui/AppFooter/AppFooter";
import AddAddress from "../AddAddress/AddAddress";


const UserProfile = (props) => {
    const contextVal = useContext(AppContext)

    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [update, setUpdate] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showAddressForm, setShowAddressForm] = useState(false)

    const {addToast} = useToasts()

    useEffect(() => {
        //getting user profile
        const url = `/users/${contextVal.user.uid}.json`
        axiosInstance.get(url)
            .then(res => {
                setUserData(res.data)
                setFirstName(res.data.name.split(" ")[0])
                setLastName(res.data.name.split(" ")[1])
                setPhone(res.data.phone)
                setTimeout(() => setIsLoading(false), 500)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }, [contextVal.user.uid, isUpdating])

    const fNameHandler = (event) => {
        setUpdate(true)
        setFirstName(event.target.value)
    }

    const lNameHandler = (event) => {
        setUpdate(true)
        setLastName(event.target.value)
    }

    const phoneHandler = (event) => {
        setUpdate(true)
        setPhone(event.target.value)
    }

    //sends psd reset email to user's registered mail
    const forgotPsdHandler = () => {
        const email = contextVal.user.email
        if (email.length === 0) {
            return addToast("Something went wrong", {
                appearance: 'error',
                autoDismiss: true,
                placement: "top-center"
            })
        }
        setIsUpdating(true)
        Firebase.auth().sendPasswordResetEmail(email)
            .then(res => {
                addToast("We have sent you an password reset link to your registered email", {
                    appearance: 'success',
                    autoDismiss: true,
                    placement: "top-center"
                })
                setIsUpdating(false)
            })
            .catch(err => {
                addToast(err.message, {
                    appearance: 'error',
                    autoDismiss: true,
                    placement: "top-center"
                })
                setIsUpdating(false)

            })
    }

    //update phone name details
    const submitBasicDetails = () => {
        if (firstName.length === 0) {
            return addToast("First name cannot be empty!", {
                appearance: 'error',
                autoDismiss: true,
                placement: "top-center"
            })
        }

        if (lastName.length === 0) {
            return addToast("Last name cannot be empty!", {
                appearance: 'error',
                autoDismiss: true,
                placement: "top-center"
            })
        }

        if (phone.length === 0) {
            return addToast("Phone number cannot be empty!", {
                appearance: 'error',
                autoDismiss: true,
                placement: "top-center"
            })
        }

        if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            return addToast("Invalid phone number!", {
                appearance: 'error',
                autoDismiss: true,
                placement: "top-center"
            })
        }

        setUserData(prevState => {
            prevState.name = firstName + " " + lastName
            prevState.phone = phone
        })

        setIsUpdating(true)
        contextVal.user.updateProfile({
            displayName: firstName
        })
            .then(res => {
                const nameUrl = `/users/${contextVal.user.uid}.json`
                axiosInstance.put(nameUrl, userData)
                    .then(res => {
                        setIsUpdating(false)
                        addToast("Update successful", {
                            appearance: 'success',
                            autoDismiss: true,
                            placement: "top-center"
                        })
                    })
                    .catch(err => {
                        setIsUpdating(false)
                        addToast("Cannot update details", {
                            appearance: 'error',
                            autoDismiss: true,
                            placement: "top-center"
                        })
                    })
            })
            .catch(ERR => {
                setIsUpdating(false)
                addToast("Something went wrong please try again!!", {
                    appearance: 'error',
                    autoDismiss: true,
                    placement: "top-center"
                })
            })
    }

    const updateStates = (value, val) => {
        setIsUpdating(value)
        setShowAddressForm(val)
    }

    const removeAddress = (key) =>{
        const url = `/users/${contextVal.user.uid}/address/${key}.json`
        setIsUpdating(true)
        axiosInstance.delete(url)
            .then(res => {
                addToast("Address removed successfully!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setIsUpdating(false)
            })
            .catch(err => {
                addToast("Something went wrong!", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setIsUpdating(false)
            })

    }

    if (!contextVal.isLoggedIn) {
        return <Redirect to={"/signin?from=profile"}/>
    }
    let spinner = <Spinner/>
    let view = null
    if (!isLoading) {
        spinner = null
        if (userData) {
            view = (
                <div className={Style.UserProfile}>
                    <aside>
                        <div className={Style.UserProfileHeader}>
                            <img
                                src={contextVal.user.photoURL}/>
                            <h3 style={{marginBottom: "4px"}}>{"Hi! " + userData.name}</h3>
                            <h5 style={{marginTop: "8px"}}>{contextVal.user.email}</h5>
                        </div>
                    </aside>
                    <main>
                        <article>
                                <span style={{display: "flex", justifyContent: "space-between"}}>
                                    <h4>Basic details</h4>
                                    {update && <h4 style={{margin: "2px"}} className={Style.topButton} onClick={() => submitBasicDetails()}>✔</h4>}
                                </span>
                            <input
                                type="name"
                                required
                                placeholder={"First name"}
                                value={firstName}
                                onChange={(event) => fNameHandler(event)}
                            />

                            <input
                                type="name"
                                placeholder={"Last name"}
                                required
                                value={lastName}
                                onChange={(event) => lNameHandler(event)}
                            />
                            <input
                                placeholder="Phone no."
                                type="tel"
                                value={phone}
                                onChange={(event) => phoneHandler(event)}
                            />
                            <br/>
                            <h5 onClick={() => forgotPsdHandler()}>Request password change</h5>
                        </article>
                        <article>
                            <span style={{display: "flex", justifyContent: "space-between"}}>
                                    <h4>Manage address</h4>
                                    <h2 className={Style.topButton} style={{margin: "2px"}} onClick={() => setShowAddressForm(true)}>+</h2>
                            </span>
                            {!userData.address ? <p>No address added</p> :
                                <div>
                                    {Object.keys(userData.address).map(key => {
                                        return (
                                           <div style={{borderBottom:"1px solid black", padding:"4px 8px",marginBottom:"6px",fontFamily:"monospace"}}>
                                               <p>{userData.address[key].name}</p>
                                               <p>{userData.address[key].line}</p>
                                               <p>+91 {userData.address[key].phone}</p>
                                               <button className={Style.deleteButton}
                                                       onClick={() => removeAddress(key)}
                                               >Delete</button>
                                           </div>
                                        )
                                    })}

                                </div>
                            }
                            {showAddressForm && <AddAddress setUpdating={(value, val) => updateStates(value, val)}/>}
                        </article>
                        <article>
                            <h4>Contact us</h4>
                            <p><strong>Mail us: </strong>support@tiddler.tech</p>
                            <p><strong>Call us: </strong>+91 9876543210</p>
                        </article>
                    </main>
                </div>
            )
        }
    }


    return (
        <React.Fragment>
            <LoadModal show={isUpdating}/>
            {spinner}
            {view}
            <AppFooter/>
        </React.Fragment>
    )


}
export default UserProfile
