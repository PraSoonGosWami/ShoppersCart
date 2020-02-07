import React, {Component} from 'react'
import Axios from "../../../AxiosInstance";
import ProductHolder from '../../../ui/homeProductHolder/homeProductHolder'
import ProductCard from '../../../components/productCard/productCard'
import {withRouter} from "react-router";

class HomePageProducts extends Component {
    state = {products: null}

    componentDidMount() {
        Axios.get("/products.json")
            .then(response => this.setState({products: response.data}))
            .catch(error => console.log(error))

    }

    onProductCardClickedHandler = (catId, pId) => {
        console.log(catId, " ", pId)
        console.log(this.props.history)
        this.props.history.push("products/"+catId+"/"+pId)
    }

    onViewAllButtonClickedHandler = (catId) =>{
        this.props.history.push("category/"+catId)
    }

    render() {
        let ProductHolders = null;
        if (this.state.products)
            ProductHolders = Object.keys(this.state.products)
                .map((catId) => {
                    return (
                        <ProductHolder
                            onClick={()=>this.onViewAllButtonClickedHandler(catId)}
                            title={catId.toString()}
                            key={catId}>
                            {Object.keys(this.state.products[catId])
                                .map((pId, index) => {
                                    if (index < 6)
                                        return (
                                            <ProductCard
                                                key={pId}
                                                onClick={() => this.onProductCardClickedHandler(this.state.products[catId][pId].category, pId)}
                                                src={this.state.products[catId][pId].url}
                                                name={this.state.products[catId][pId].name}
                                                details={this.state.products[catId][pId].details}
                                                price={this.state.products[catId][pId].price}
                                            />
                                        )
                                    else
                                        return;
                                })}
                        </ProductHolder>
                    )
                })

        return (
            <div>
                {ProductHolders}
            </div>
        )
    }
}

export default withRouter(HomePageProducts)
