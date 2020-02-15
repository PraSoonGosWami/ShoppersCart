import React from 'react'
import Style from './backdrop.module.css'

const backdrop = (props) => {
    return (
        props.show && <div className={Style.Backdrop} onClick={props.onBackDropClicked}></div>
    )
}

export default backdrop
