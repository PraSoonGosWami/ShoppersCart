import React, {useEffect, useState} from 'react'
import Style from './search.module.css'
import axiosInstance from "../../AxiosInstance";
import SearchItem from "./SearchItem/SearchItem";

const Search = (props) => {

    const [showSearchResult, setShowSearchResult] = useState(false)
    const [data, setData] = useState([])
    const [result, setResult] = useState()
    const [type, setType] = useState("")


    useEffect(() => {
        const products = []
        axiosInstance.get('/products.json')
            .then(async res => {
                await Object.keys(res.data).map(catId => {
                    Object.keys(res.data[catId]).map(pid => {
                        products.push(res.data[catId][pid])
                    })
                })
                await setData(products)
            })
            .catch(err => console.log(err))


    }, [])


    const searchResult = (event) => {
        setShowSearchResult(true)
        const query = event.target.value
        if (query.length >= 1) {
            let res
            //search by product name
            res = data.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
            setType("pro")
            if (!res || res.length === 0) {
                res = data.filter(p => p.catName.toLowerCase().includes(query.toLowerCase()))
                setType("cat")

            } else {

            }
        // displays at most 6 items in search result
            if(res.length >6)
                res.length = 6
            setResult(res)
        }/*else{
            setResult(null)
        }*/

    }

    return (
        <div className={Style.Search}>
            <input
                className={Style.Input}
                type='search'
                placeholder='Search for products, categories and more'
                onChange={(event) => searchResult(event)}
                onClick={() => setShowSearchResult(true)}


            />
            {showSearchResult && <div className={Style.SearchResult}>
                <h4 className={Style.SearchResultHeading}>
                    <span>Search results..</span>
                    <span className={Style.Close} style={{fontWeight: "bold", fontSize: "1.3em"}}
                          onClick={() => setShowSearchResult(false)}>&times;</span>
                </h4>
                <div className={Style.ResultsDiv}>
                    {(result && result.length > 0) ? result.map(p => {
                        return <SearchItem
                            onClick={() => setShowSearchResult(false)}
                            key={p.id}
                            type={type}
                            catId={p.category}
                            id={p.id}
                            name={p.name}
                            catName={p.catName}
                            url={p.url}
                        />
                    }) : <p>No results found...</p>}
                </div>
            </div>}
        </div>
    )
}

export default Search
