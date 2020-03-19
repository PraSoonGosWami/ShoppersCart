import React from 'react'
import Style from './landing.module.css'
import {NavLink} from "react-router-dom"

const categories = (props) => {
    return(
        <div className={Style.Landing}>
            <NavLink to={"/admin"} exact className={Style.Link}>
                <p className={Style.LandingName}>Home</p>
            </NavLink>
            <NavLink to={"/admin/addprod"} className={Style.Link}>
                <p className={Style.LandingName}>Add Products</p>
            </NavLink>
            <NavLink to={"/admin"} className={Style.Link}>
                <p className={Style.LandingName}>Modify Products</p>
            </NavLink>
            <NavLink to={"/admin/delprod"} className={Style.Link}>
                <p className={Style.LandingName}>Delete Products</p>
            </NavLink>
        </div>
    )
}

export default categories