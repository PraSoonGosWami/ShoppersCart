import React from 'react';
import axiosInstance from "../../../AxiosInstance";
import Style from './addProduct.module.css';
import {NavLink} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class addProduct extends React.Component {

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
        url: ''
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        const { catName, category, color, coupon, details, discount, id, isAvailable, name, price } = this.state;
        axiosInstance.put("/products/"+this.state.category+"/p013.json", { catName, category, color, coupon, details, discount, id, isAvailable, name, price})
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    render() {
      const options = [
        'Phones & Accessories', 'Laptops & Computers', 'Fashion & Clothing'
      ]
        const { catName, category, color, coupon, details, discount, id, isAvailable, name, price } = this.state;
        return(
            <div className={Style.addProd} onSubmit={this.handleSubmit}>
                <form>
                    <label>Category</label>
                    <Dropdown className={Style.txt} options={options} onChange={this._onSelect} value={catName} placeholder="Select an option" />
                    <label>Category ID</label>
                    <select className={Style.txt} value={category} name="id" onChange={this.handleChange}>
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
                    <select className={Style.txt} name="isAvailable" value={isAvailable} onChange={this.handleChange}>
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

export default addProduct;