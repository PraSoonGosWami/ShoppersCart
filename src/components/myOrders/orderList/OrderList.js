import React, {useCallback} from 'react'
import Style from './OrderList.module.css'
import {Link, useHistory} from "react-router-dom";

const OrderList = (props) => {
    const items = props.items
    const history = useHistory()
    const onClick = (id, cid) =>{
        history.push("/products/"+cid+"/"+id)
    }
    return (
        <div className={Style.OrderList}>
            <header>
                <aside>
                    <h5>Order Date</h5>
                    <h5>{props.date}</h5>
                </aside>
                <article style={{textAlign: "right"}}>
                    <h5>Amount</h5>
                    <h5>₹ {props.price}</h5>
                </article>
            </header>
            <section>
                {items.map(item => {
                    return (
                        <Link key={item.id} to={"/products/"+item.cid+"/"+item.id} className={Style.OrderListItem}>
                            <img src={item.img}/>
                            <main>
                                <h4>{item.name}</h4>
                                <h5 style={{color:"darkgray"}}>in {item.catName}</h5>
                                <h5>{item.price}</h5>
                                <button onClick={()=> onClick(item.id,item.cid)}>Buy Again</button>
                            </main>
                        </Link>
                    )
                })}
            </section>
            <div className={Style.OrderId}>
                <h5>Order Id# {props.orderId}</h5>
            </div>
        </div>
    )
}

export default OrderList
