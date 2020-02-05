import React from 'react';

import './signUp.css';

class signUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:'',phNo:'',email: '',psw:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.name,phNo: event.target.phNo, email: event.target.email, psw: event.target.psw});
  }

  handleSubmit(event) {
    alert('Sign Up Successful');
    event.preventDefault();
  }

render() {
    return(
    <div>
      <h1> Sign Up</h1>
      <form onSubmit={this.handleSubmit}>
        <label for="name"><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} required/>
        <label for="phonenumber"><b>Mobile Number</b></label>
        <input type="tel" placeholder="Enter Mobile Number" value={this.state.phNo} onChange={this.handleChange} required/>
        <label for="email"><b>Email</b></label>
        <input type="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} required/>
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={this.state.psw} onChange={this.handleChange}  required/>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"/> Remember me
        <p>By creating an account you agree to our <a href="#" style="color:rgb(190, 175, 74);">Terms & Privacy</a>.</p>
        <div class="clearfix">
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
      </form>
        
    </div>
    )
}
}

export default signUp;