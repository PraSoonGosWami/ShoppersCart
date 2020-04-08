import React, {useEffect, useState} from 'react'
import Style from './OrderList.module.css'
import {Link, useHistory} from "react-router-dom";
import Steps,{Step} from 'rc-steps'
import './stepper.css';
import 'rc-steps/assets/iconfont.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag,faTruck,faDoorClosed} from "@fortawesome/free-solid-svg-icons";

const OrderList = (props) => {
    const items = props.items
    const history = useHistory()
    const [level,setLevel] = useState(0)
    const onClick = (id, cid) =>{
        history.push("/products/"+cid+"/"+id)
    }

    useEffect(()=>{
        getDateDifference()
    })
    const getDateDifference = () =>{
        const orderDate = props.date.split('/')
        const date1 = new Date(orderDate[2],parseInt(orderDate[1])-1,orderDate[0]);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 1){
            setLevel(1)
        }
        if(diffDays >2){
            setLevel(2)
        }
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
            <div className={Style.Stepper}>
                <Steps labelPlacement="vertical" current={level}  >
                    <Step title="Order placed" icon={ <FontAwesomeIcon icon={faShoppingBag} size={"sm"}/>}/>
                    <Step title="In-transit" icon={ <FontAwesomeIcon icon={faTruck} size={"sm"}/>}/>
                    <Step title="Delivered" icon={ <FontAwesomeIcon icon={faDoorClosed} size={"sm"}/>}/>
                </Steps>
            </div>
            <div className={Style.OrderId}>
                <h5>Order Id# {props.orderId}</h5>
            </div>
        </div>
    )
}

export default OrderList
