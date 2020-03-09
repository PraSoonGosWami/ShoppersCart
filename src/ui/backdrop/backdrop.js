import React from 'react'
import Style from './backdrop.module.css'

const backdrop = (props) => {
    return (
        props.show && <div className={Style.Backdrop} style={props.zindex} onClick={props.onBackDropClicked}></div>
    )
}

export default backdrop
