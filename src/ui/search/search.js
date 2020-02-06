import React from 'react'
import Style from './search.module.css'

const search = (props) => {
    return(
        <input className={Style.Input} type='search' placeholder='Search for products, brands and more'/>
    )
}

export default search
