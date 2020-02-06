import React from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
        baseURL:"https://shopper-cart.firebaseio.com/"
    }
)

export default axiosInstance
