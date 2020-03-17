import React from 'react';
import axios from 'axios';
import Style from './addProduct.module.css';
import {NavLink} from "react-router-dom";

class addProduct extends React.Component {

    state = {
        name: '',
        price: '',
        catName: '',
        details: ''
      }
    
      handleChange = event => {
        this.setState({ name: event.target.value,price: event.target.value, catName: event.target.value, details: event.target.value  });
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const product = {
          name: this.state.name,
          price: this.state.price,
          catName: this.state.catName,
          details: this.state.details
        };
    
        axios.put(`https://shopper-cart.firebaseio.com/products/c001`, { product })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    render() {
        return(
            <div className={Style.addProd} onSubmit={this.handleSubmit}>
                <form>
                    <label for="fname">Product Name</label>
                    <input className={Style.txt} type="text" id="pname" name="name" placeholder="Product Name.." onChange={this.handleChange}/>
                    <label for="lname">Product Price</label>
                    <input className={Style.txt} type="text" id="pprice" name="price" placeholder="Product Price.." onChange={this.handleChange}/>
                    <label for="cat">Category</label>
                    <select className={Style.txt} id="catName" name="category" onChange={this.handleChange}>
                        <option value="paa">Phones & Accessories</option>
                        <option value="lac">Laptops & Computers</option>
                        <option value="fac">Fashion & Clothing</option>
                    </select>
                    <label for="detail">Product Details</label>
                    <textarea className={Style.txt} id="detail" name="details" placeholder="Details..." onChange={this.handleChange} style={{height:"200px"}}></textarea>
                    {/*<label for="detail">Product Image</label>
                    <input className={Style.txt} type="file" id="img" name="img" accept="image/*"/>*/}
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