import React from 'react'
import Style from './showcase.module.css'

const showcase = (props) => {
    return(
        <div className={Style.Showcase} onClick={props.onClick}>
            <img src={props.src} className={Style.ShowcaseImage} alt="Showcase"/>
        </div>
    )
}

export default showcase
