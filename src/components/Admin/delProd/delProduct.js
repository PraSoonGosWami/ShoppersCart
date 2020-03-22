import React from 'react';
import axiosInstance from "../../../AxiosInstance";
import Style from './delProduct.module.css';
import {NavLink} from "react-router-dom";

class addProduct extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    state = {
        category: '',
        id: '',
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        var category = document.getElementById("catID").value;
        axiosInstance.delete("/products/"+category+"/"+this.state.id+".json");
        alert("Product Deleted Successfully");
      }

    render() {
        const { category, id } = this.state;
        return(
            <div className={Style.addProd} onSubmit={this.handleSubmit}>
                <form>
                    <label>Category ID</label>
                    <select className={Style.txt} id="catID" value={category} name="id" onChange={this.handleChange}>
                        <option value={"c001"}>c001</option>
                        <option value={"c002"}>c002</option>
                        <option value={"c003"}>c003</option>
                        <option value={"c004"}>c004</option>
                        <option value={"c005"}>c005</option>
                    </select>
                    <label>Product ID</label>
                    <input className={Style.txt} type="text" value={id} name="id" onChange={this.handleChange}/>
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