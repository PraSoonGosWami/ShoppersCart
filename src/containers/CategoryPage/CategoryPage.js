import React, {Component} from 'react'
import {withRouter} from "react-router";
import Style from './Category.module.css'
import Axios from '../../AxiosInstance'
import Spinner from '../../ui/spinner/spinner'
import CategoryListView from './categoryListView/categoryListView'

class CategoryPage extends Component {
    state = {
        products : null,
        isLoading: true,
        catName : "Loading..."
    }
    catId = this.props.match.params.cid

    componentDidMount() {

        Axios.get("/products/"+this.catId+".json")
            .then(response => {
                this.setState({isLoading:false})
                this.setState({products:response.data})
            })
            .catch(error=>{
                this.setState({isLoading:false})
                console.log(error)
            })

        Axios.get("/categories/"+this.catId+"/catName.json")
            .then(response => {
                this.setState({catName:response.data})
                this.setState({isLoading:false})

            } )
            .catch(error => {
                console.log(error)
                this.setState({isLoading:false})

            })
    }



    render() {
        let productList = <Spinner/>
        let heading = <h3>{this.state.catName}</h3>

        if(!this.state.isLoading && this.state.products) {
            productList = Object.keys(this.state.products)
                .map((pid) => {
                    return (
                        <CategoryListView
                            key={pid}
                            href={this.catId + "/" + pid}
                            url={this.state.products[pid]["url"]}
                            name={this.state.products[pid]["name"]}
                            catName={this.state.products[pid]["catName"]}
                            price={this.state.products[pid]["price"]}
                            details={this.state.products[pid]["details"]}
                            color={this.state.products[pid]["color"]}
                        />
                    )
                })
        }

        return(
            <div className={Style.CategoryPage}>
                {heading}
                {productList}
            </div>
        )
    }
}

export default withRouter(CategoryPage)
