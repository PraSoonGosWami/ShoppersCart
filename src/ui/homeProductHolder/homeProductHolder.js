import React from 'react'
import Style from './homeProductHolder.module.css'

const homeProductHolder = (props) => {
    return(
        <div className={Style.HomeProductHolder}>
            <header>
                <h4>{props.title}</h4>
                <button onClick={props.onClick}>View all ></button>
            </header>
            <section>
                {props.children}
            </section>
        </div>
    )
}

export default homeProductHolder
