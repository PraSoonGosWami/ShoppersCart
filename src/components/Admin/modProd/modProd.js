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
        catName: '',
        category: '',
        color: '',
        coupon: '',
        details: '',
        discount: '',
        id: '',
        isAvailable: '',
        name: '',
        price: '',
        url: 'gs://shopper-cart.appspot.com/samsung-galaxy-a50s.jpg'
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        const { color, coupon, details, discount, id, name, price } = this.state;
        var catName = document.getElementById("catName").value;
        var category = document.getElementById("catID").value;
        var isAvailable = document.getElementById("isAvl").value;
        axiosInstance.put("/products/"+category+"/"+this.state.id+".json", { catName, category, color, coupon, details, discount, id, isAvailable, name, price})
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
render() {
    const { catName, category, color, coupon, details, discount, id, isAvailable, name, price } = this.state;
    return(
    <div className={Style.modProd} onSubmit={this.handleSubmit}>
        <form>
            <label>Category</label>
                <select className={Style.txt} id="catName" value={catName} name="id" onChange={this.handleChange}>
                    <option value={"Phones & Accessories"}>Phones & Accessories</option>
                    <option value={"Laptops & Computers"}>Laptops & Computers</option>
                    <option value={"Fashion & Clothing"}>Fashion & Clothing</option>
                </select>
           <label>Category ID</label>
                <select className={Style.txt} id="catID" value={category} name="id" onChange={this.handleChange}>
                    <option value={"c001"}>c001</option>
                    <option value={"c002"}>c002</option>
                    <option value={"c004"}>c004</option>
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