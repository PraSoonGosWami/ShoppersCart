import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import CartItem from "./cartItem/CartItem";
import Style from './Cart.module.css'

const Cart = (props) => {

    //getting context value
    const contextValue = useContext(AppContext)

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

    const onRemoveFromCartButtonClickedListener = (id) => {

    }
    for(let item of cart){
        totalPrice +=  (item["originalPrice"]-item["discountedPrice"])
        totalDiscount += item["discountedPrice"]
    }
        savePercent = (Math.round(totalDiscount/totalPrice*100))
    return (
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
}

export default Cart
