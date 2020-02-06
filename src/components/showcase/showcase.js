import React from 'react'
import Style from './showcase.module.css'

const showcase = (props) => {
    return(
        <div className={Style.Showcase}>
            <img src={props.src} className={Style.ShowcaseImage}/>
        </div>
    )
}

export default showcase
