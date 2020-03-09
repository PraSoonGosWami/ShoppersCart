import React from 'react'
import Backdrop from "../backdrop/backdrop";
import Style from "../AuthModal/AuthModal.module.css";
import Spinner from '../spinner/spinner'

const LoadModal = (props) => {
    const pop = props.show
    return (

            pop &&
                <React.Fragment>
                    <Backdrop  zindex={{zIndex:"96"}}show={pop}/>
                    <div className={Style.AuthModal}>
                        <Spinner/>
                    </div>
                </React.Fragment>



    )
}

export default LoadModal
