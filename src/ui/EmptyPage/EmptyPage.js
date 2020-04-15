import React from 'react'
import Style from './EmptyPage.module.css'

const EmptyPage = (props) => {
    return(
        <div className={Style.EmptyPage}>
            <img src={props.img} alt={props.alt}/>
            <h3>{props.text}</h3>
        </div>
    )
}

export default EmptyPage
