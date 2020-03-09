import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import CartItem from "./cartItem/CartItem";
import Style from './Cart.module.css'
import removeFromCart from "../../helper/removeFromCart";
import {useToasts} from "react-toast-notifications";
import LoadModal from "../../ui/LoadModal/LoadModal";
import Spinner from '../../ui/spinner/spinner'
const Cart = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    //init state
    const [adding,setAdding] = useState(false)

    //toast notification
    const {addToast} = useToasts()

    //initializing states
    const [cart, setCart] = useState([])
    let totalPrice = 0
    let totalDiscount = 0
    let savePercent = 0
    //getting data from context and setting it to current component state
    // once components get mounted
    useEffect(() => {
        if (contextValue.cart) {
            setCart(contextValue.cart)
        }
    }, [contextValue.cart])

    //removes selected item from the cart
    const onRemoveFromCartButtonClickedListener = (id) => {
        removeFromCart(id, contextValue, addToast, setAdding)
    }
    for(let item of cart){
        totalPrice +=  (item["originalPrice"]-item["discountedPrice"])
        totalDiscount += item["discountedPrice"]
    }
    if(totalPrice !==0 & totalDiscount!==0)
        savePercent = (Math.round(totalDiscount/totalPrice*100))
    let cartDisplay = null
    let spinner = <Spinner/>
    let emptyCart = null

    if(cart){
        cartDisplay = (
            <div className={Style.Cart}>
                <aside>
                    {cart.map(item => {
                        return <CartItem
                            key={item.id}
                            name={item.name}
                            catName={item.catName}
                            price={item.price}
                            img={item.img}
                            href={`/products/${item.cid}/${item.id}`}
                            onRemoveFromCartButton={() => onRemoveFromCartButtonClickedListener(item.id)}
                        />
                    })}
                </aside>
                <section>
                    <div className={Style.CartSummary}>
                        <h3>Order Summary</h3>
                        <p><strong>No. of items: {cart.length}</strong></p>
                        <p><strong>Total price: {"₹" +totalPrice}</strong></p>
                        <p><strong>Total discount: {"₹" + totalDiscount} </strong></p>
                        <p><strong>You save: {savePercent+"%"}</strong></p>
                    </div>

                    <div className={Style.CartSummary}>
                        <h3>Order Items</h3>
                        <table>
                            <tbody>
                            {cart.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>1</td>
                                        <td>{"\t"}</td>
                                        <td >{item.price}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div className={Style.ProceedButton}>
                            <button>CHECKOUT</button>
                        </div>
                    </div>

                </section>
            </div>
        )
        spinner=null
        emptyCart = null
    }else{
        cartDisplay = null
        spinner=null
        emptyCart = <h3>Oops! Seems like your cart is empty</h3>
    }
    return (
        <React.Fragment>
            <LoadModal show={adding}/>
            {spinner}
            {cartDisplay}
            {emptyCart}
        </React.Fragment>
    )
}

export default Cart
