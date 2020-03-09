import React from 'react';
import Style from './addProduct.module.css';
import {NavLink} from "react-router-dom";

const addProduct = () => {
    return(
    <div className={Style.addProd}>
        <form>
            <label for="fname">Product Name</label>
            <input className={Style.txt} type="text" id="pname" name="prodname" placeholder="Product Name.."/>
            <label for="lname">Product Price</label>
            <input className={Style.txt} type="text" id="pprice" name="prodprice" placeholder="Product Price.."/>
            <label for="cat">Category</label>
            <select className={Style.txt} id="cat" name="category">
                <option value="paa">Phones & Accessories</option>
                <option value="lac">Laptops & Computers</option>
                <option value="fac">Fashion & Clothing</option>
            </select>
            <label for="detail">Product Details</label>
            <textarea className={Style.txt} id="detail" name="detail" placeholder="Details..." style={{height:"200px"}}></textarea>
            <label for="detail">Product Image</label>
            <input className={Style.txt} type="file" id="img" name="img" accept="image/*"/>
            <input className={Style.sub} type="submit" value="Submit"/>
        </form>
            <NavLink to={"/admin"}>
                <input className={Style.back} type="submit" value="Go Back"/>
            </NavLink>
        
    </div>
    );
}

export default addProduct