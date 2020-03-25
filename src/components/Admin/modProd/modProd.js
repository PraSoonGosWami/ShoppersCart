import React from 'react';
import axiosInstance from "../../../AxiosInstance";
import Style from './modProd.module.css';
import {NavLink} from "react-router-dom";

class modProduct extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        catName: null,
        category: null,
        color: null,
        coupon: null,
        details: null,
        discount: null,
        id: null,
        isAvailable: null,
        name: null,
        price: null,
        url: 'gs://shopper-cart.appspot.com/samsung-galaxy-a50s.jpg'
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        let x = 1;
        let { color, coupon, details, discount, id, name, price } = this.state;
        var catName = document.getElementById("catName").value;
        var category = document.getElementById("catID").value;
        var isAvailable = document.getElementById("isAvl").value;
        axiosInstance.get("/products/"+category+"/"+this.state.id+".json")
            .then(response => {
                if(color===null)
                {
                    console.log(response.data.color);
                    color=response.data.color;
                }
                if(coupon===null)
                {
                    console.log(response.data.coupon);
                    coupon=response.data.coupon;
                }
                if(details===null)
                {
                    console.log(response.data.details);
                    details=response.data.details;
                }
                if(discount===null)
                {
                    console.log(response.data.discount);
                    discount=response.data.discount;
                }
                if(name===null)
                {
                    console.log(response.data.name);
                    name=response.data.name;
                }
                if(price===null)
                {
                    console.log(response.data.price);
                    price=response.data.price;
                }
                axiosInstance.put("/products/"+category+"/"+this.state.id+".json", { catName, category, color, coupon, details, discount, id, isAvailable, name, price})
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        const { catName, category, color, coupon, details, discount, id, isAvailable, name, price } = this.state;
        return(
            <div className={Style.modProd} onSubmit={this.handleSubmit}>
                <form>
                    <label>Category</label>
                    <select className={Style.txt} id="catName" value={catName} name="catName" onChange={this.handleChange}>
                        <option value={"Phones & Accessories"}>Phones & Accessories</option>
                        <option value={"Laptops & Computers"}>Laptops & Computers</option>
                        <option value={"Home & Appliances"}>Home & Appliances</option>
                        <option value={"Fashion & Clothing"}>Fashion & Clothing</option>
                        <option value={"Furniture & Decor"}>Furniture & Decor</option>
                    </select>
                    <label>Category ID</label>
                    <select className={Style.txt} id="catID" value={category} name="category" onChange={this.handleChange}>
                        <option value={"c001"}>Phones & Accessories (c001)</option>
                        <option value={"c002"}>Laptops & Computers (c002)</option>
                        <option value={"c003"}>Home & Appliances (c003)</option>
                        <option value={"c004"}>Fashion & Clothing (c004)</option>
                        <option value={"c005"}>Furniture & Decor (c005)</option>
                    </select>
                    <label>Color</label>
                    <input className={Style.txt} type="text" value={color} name="color" onChange={this.handleChange}/>
                    <label>Coupon</label>
                    <input className={Style.txt} type="text" value={coupon} name="coupon" onChange={this.handleChange}/>
                    <label>Product Details</label>
                    <textarea className={Style.txt} name="details" value={details} onChange={this.handleChange} style={{height:"200px"}}></textarea>
                    <label>Discount</label>
                    <input className={Style.txt} type="text" value={discount} name="discount" onChange={this.handleChange}/>
                    <label>Product ID</label>
                    <input className={Style.txt} type="text" value={id} name="id" onChange={this.handleChange}/>
                    <label>Availability</label>
                    <select className={Style.txt} id="isAvl" name="isAvailable" value={isAvailable} onChange={this.handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <label>Product Name</label>
                    <input className={Style.txt} type="text" name="name" value={name} onChange={this.handleChange}/>
                    <label>Product Price</label>
                    <input className={Style.txt} type="text" name="price" value={price} onChange={this.handleChange}/>
                    <label>Product Image</label>
                    <input className={Style.txt} type="file" name="img" accept="image/*"/>
                    <input className={Style.sub} type="submit" value="Submit"/>
                </form>
                <NavLink to={"/admin"}>
                    <input className={Style.back} type="submit" value="Go Back"/>
                </NavLink>
            </div>
        );
    }
}

export default modProduct