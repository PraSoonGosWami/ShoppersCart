import React, {useContext, useState} from 'react'
import Style from './AddAddress.module.css'
import {useToasts} from 'react-toast-notifications'
import {AppContext} from "../../context/AppContext";
import uuid from 'uuid/v4'
import axiosInstance from "../../AxiosInstance";
const AddAddress = (props) => {

    const {addToast} = useToasts()
    const contextVal = useContext(AppContext)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const addNewAddressToDb = async () => {
        if(name.length ===0){
            return addToast("Please enter name", {
                appearance: 'error',
                autoDismiss: true,
            })
        }

        if(phone.length ===0){
            return addToast("Please enter phone number", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if(phone.length !==10 || !/^\d+$/.test(phone)){
            return addToast("Please enter a valid phone number", {
                appearance: 'error',
                autoDismiss: true,
            })
        }


        if(address.length ===0){
            return addToast("Please enter address", {
                appearance: 'error',
                autoDismiss: true,
            })
        }

        if(address.length <= 10){
            return addToast("Address too short!", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        props.setUpdating(true,true)
        const addressId = await uuid()
        const url = `/users/${contextVal.user.uid}/address/${addressId}.json`
        const data = {
            id: addressId,
            name,
            phone,
            line : address.trim(),
        }
        axiosInstance.put(url,data)
            .then(res => {
                addToast("Address added successfully!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                props.setUpdating(false,false)

            })
            .catch(err=>{
                addToast("Something went wrong!Please try again later", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                props.setUpdating(false,true)
            })
    }

    const buttonHandler = () => {

            addNewAddressToDb()
                .then(res => {

                })

    }

    return (
        <div className={Style.AddAddress}>
            <input type={"name"} placeholder={"Name"} required value={name}
                   onChange={(event) => {setName(event.target.value)} }
            />
            <input type={"tel"} placeholder={"Phone no."} required value={phone}
                   onChange={(event) => {setPhone(event.target.value)} }
            />
            <br/>
            <textarea placeholder={"Enter address and pin code"} rows={7} value={address}
                      onChange={(event) => {setAddress(event.target.value)} }
            />
            <button type={"button"} onClick={buttonHandler}>Done</button>
        </div>
    )
}

export default AddAddress

