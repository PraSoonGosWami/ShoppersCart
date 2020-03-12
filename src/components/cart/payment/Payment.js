import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router";
import Style from './Payment.module.css'
import Lottie from 'react-lottie'
import paymentAnim from './paymentAnimation'
import paymentDomeAnim from './paymentDoneAnimation'
import {AppContext} from '../../../context/AppContext'
import Axios from '../../../AxiosInstance'
import {useToasts} from 'react-toast-notifications'

const Payment = (props) => {
    const location = useLocation()
    const history = useHistory()
    const [price, setPrice] = useState()

    const [animation, setAnimation] = useState(paymentAnim)
    const contextValue = useContext(AppContext)

    const {addToast} = useToasts()

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


    //creating new order
    const createOrder = () => {

    }


    //pay button handler
    const payNowHandler = () => {
        const url = `/cart/${contextValue.user.uid}.json`

        //clearing cart after payment
        Axios.delete(url)
            .then(res => {
                setAnimation(paymentDomeAnim)
                contextValue.setCart([])
                addToast("Payment successful!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setTimeout(()=>history.replace('/'),3000)

            })
            .catch(err => {
                addToast("Payment failed!Please try again!", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })

    }


    return (
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
    )
}

export default Payment
