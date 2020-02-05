import React from 'react';

import './signUp.css';

const signUp = (props) => {
    return(
    <div>
      <h1> Sign Up</h1>
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" required/>
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
        <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"/> Remember me
        </label>
        <p>By creating an account you agree to our <a href="#" style="color:rgb(190, 175, 74);">Terms & Privacy</a>.</p>
        <div class="clearfix">
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
    </div>
    )
}