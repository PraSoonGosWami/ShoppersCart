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
        product !== null ?
            <div>
                <aside>

                </aside>
                <section>
                    <h2>{product.name}</h2>
                    <p>props.details</p>
                    <hr/>
                    <h2>{product.price}</h2>


                </section>
            </div>
            :
            <h5  style={{textAlign:"center"}}>Something went wrong!!Product you are trying to see is unavailable</h5>
    )
}

export default ProductPage
