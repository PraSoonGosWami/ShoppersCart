import React, {useState, useEffect} from 'react'
import {useParams} from "react-router";
import axios from '../../AxiosInstance'

const ProductPage = (props) => {
    const [product , setProduct] = useState({})
    const cid = useParams()["cid"]
    const pid = useParams()["pid"]
    const url = "/products/"+cid+"/"+pid+".json"

    useEffect(() => {
        axios.get(url)
            .then(response=>{
                console.log(response)
                setProduct(response.data)
            })
            .catch(error => console.error(error))

    }, [])


    return (
        <React.Fragment>
            <img src={product.url} alt={product.name}/>
            <h3>{product.name}</h3>

        </React.Fragment>
    )
}

export default ProductPage
