import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import CartItem from "./cartItem/CartItem";
import Style from './Cart.module.css'
import removeFromCart from "../../helper/removeFromCart";
import {useToasts} from "react-toast-notifications";
import LoadModal from "../../ui/LoadModal/LoadModal";
import AppFooter from "../../ui/AppFooter/AppFooter";
import {useHistory} from "react-router";
import EmptyPage from "../../ui/EmptyPage/EmptyPage";
import EmptyCartSVG from './empty-cart.svg'

const Cart = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

    //init state
    const [adding, setAdding] = useState(false)

    //toast notification
    const {addToast} = useToasts()

    //use history
    const history = useHistory()

    //initializing states
    const [cart, setCart] = useState([])
    let totalPrice = 0
    let effectivePrice = 0
    let totalDiscount = 0
    let savePercent = 0
    //getting data from context and setting it to current component state
    // once components get mounted
    useEffect(() => {
        if (contextValue.cart) {
            setAdding(true)
            setCart(contextValue.cart)
            setTimeout(()=>setAdding(false),1000)
        }
    }, [contextValue.cart])

    //removes selected item from the cart
    const onRemoveFromCartButtonClickedListener = (id) => {
        removeFromCart(id, contextValue, addToast, setAdding)
    }

    const checkOutHandler = () => {
        if (!contextValue.isLoggedIn) {
            addToast("Please login to checkout!", {
                appearance: 'info',
                autoDismiss: true,
            })
            return history.push('/signin')
        }
        history.replace(
            {
                pathname: '/checkout/payment',
                state: {
                    price: effectivePrice,
                    data: cart
                }
            }
        )
    }


    for (let item of cart) {
        totalPrice += item["originalPrice"]
        effectivePrice += (item["originalPrice"] - item["discountedPrice"])
        totalDiscount += item["discountedPrice"]
    }
    if (totalPrice !== 0 & totalDiscount !== 0)
        savePercent = (Math.round(totalDiscount / totalPrice * 100))
    let cartDisplay = null
    let emptyCart = null

    if (!adding) {
        if (cart.length > 0) {
            cartDisplay = (
                <React.Fragment>
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
                                <h3>Order Items</h3>
                                <table>
                                    <tbody>
                                    {cart.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>1</td>
                                                <td>{"\t"}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>

                            </div>
                            <div className={Style.CartSummary}>
                                <h3>Order Summary</h3>
                                <p><strong>No. of items: {cart.length}</strong></p>
                                <p><strong>Total price: {"₹" + totalPrice}</strong></p>
                                <p><strong>Total discount: {"₹" + totalDiscount} </strong></p>
                                <p><strong>You save: {savePercent + "%"}</strong></p>
                                <p style={{fontSize: "1.15em", textAlign: "center"}}><strong>Final
                                    price: {"₹" + effectivePrice} </strong></p>

                                <div className={Style.ProceedButton}>
                                    <button onClick={() => checkOutHandler()}>CHECKOUT</button>
                                </div>
                            </div>


                        </section>
                    </div>
                    <AppFooter/>
                </React.Fragment>
            )
        } else {
            emptyCart = <EmptyPage img={EmptyCartSVG} alt={"Empty cart"} text={"Your cart seems to be empty! Let's get shopping"}/>
        }
    }


    return (
        <React.Fragment>
            <LoadModal show={adding}/>
            {cartDisplay}
            {!adding && emptyCart}
        </React.Fragment>
    )
}

export default Cart
