import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router";
import Style from './Payment.module.css'
import Lottie from 'react-lottie'
import paymentAnim from './paymentAnimation'
import paymentDomeAnim from './paymentDoneAnimation'
import {AppContext} from '../../../context/AppContext'
import Axios from '../../../AxiosInstance'
import {useToasts} from 'react-toast-notifications'
import {v1 as uuid } from 'uuid'
import LoadModal from "../../../ui/LoadModal/LoadModal";
const Payment = (props) => {
    const location = useLocation()
    const history = useHistory()
    const [price, setPrice] = useState()
    const [inProgress, setInProgress] = useState(false)

    const [animation, setAnimation] = useState(paymentAnim)
    const contextValue = useContext(AppContext)

    const {addToast} = useToasts()
    const cart = location.state.data
    useEffect(() => {
        setPrice(location.state.price)


    }, [])

    //handling accidental visit to payment page
    if(!location.state)
        return history.goBack()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    //clearing cart after payment
    const clearCart = () => {

        const url = `/cart/${contextValue.user.uid}.json`
        Axios.delete(url)
            .then(res => {
                setAnimation(paymentDomeAnim)
                contextValue.setCart([])
                addToast("Payment successful!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setInProgress(false)
                setTimeout(()=>history.replace('/'),3000)
            })
            .catch(err => {
                addToast("Payment failed!Please try again!", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setInProgress(false)

            })


    }


    //pay button handler
    const payNowHandler = () => {

        //creating new order in database

        setInProgress(true)

        const currentDate = new Date()
        const date = currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
        const orderId = uuid()
        if(cart.length <=0){
            addToast("Your cart is empty!! Cannot proceed", {
                appearance: 'error',
                autoDismiss: true,
            })
            return history.goBack()
        }
        let data = {
            item : cart,
            date,
            orderId,
            price,
            timestamp : currentDate.getMilliseconds()
        }
        const url = `/myorders/${contextValue.user.uid}/${orderId}.json`

        Axios.put(url,data)
            .then(res => {
                clearCart()
            })
            .catch(err=>{
                addToast(err.message, {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setInProgress(false)
            })

    }


    return (
        <React.Fragment>
            <LoadModal show={inProgress}/>
            <div className={Style.Payment}>
                <section>
                    <h3>Payment</h3>
                    <Lottie
                        options={defaultOptions}
                        height={300}
                        width={300}/>
                    <h4>Amount: ₹{price}</h4>
                    <button onClick={() => payNowHandler()}>Pay Now</button>
                </section>
            </div>
        </React.Fragment>

    )
}

export default Payment
