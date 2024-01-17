import React from "react";
// import axios from "axios";
import {
  Component,
  // state, changeHandler, submitLogin
} from "react";
import { Link } from "react-router-dom";
// import swal from "sweetalert";
import "./login.css";

class Login extends Component {
  //   state = {
  //     username: "",
  //     password: "",
  //   };
  //   changeHandler = (e) => {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   submitLogin = (e) => {
  //     e.preventDefault();
  //     axios
  //       .post("http://localhost:90/account/login", this.state)
  //       .then((response) => {
  //         if (response.data.success === true) {
  //           localStorage.setItem("token", response.data.token); //to save the token after user logged in
  //           localStorage.setItem("userType", response.data.data.userType); //to save the token after user logged in
  //           swal({
  //             title: "Success!!",
  //             text: response.data.data.userType,
  //             icon: "success",
  //           });

  //           window.location.href = "/male";
  //         } else {
  //           swal({
  //             title: "Error!!",
  //             text: response.data.message,
  //             icon: "error",
  //           });
  //         }
  //         console.log(response);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  render() {
    return (
      <div className="login">
        <div className="login_container">
          <h1>Todo-List</h1>
          <h2>Sign-in</h2>

          <form>
            <h5>Username</h5>
            <input
              type="text"
              name="username"
              //   value={this.state.username}
              //   onChange={this.changeHandler}
            />

            <h5>Password</h5>
            <input
              type="password"
              name="password"
              //   value={this.state.password}
              //   onChange={this.changeHandler}
            />
            <Link to="/todo">
              <button
                className="login_btn btn text-black btn-primary mr-3"
                //   onClick={this.submitLogin}
              >
                Sign In
              </button>
            </Link>
          </form>

          <Link to="/register">
            <button className="register_btn btn text-black btn-outline-primary mr-3">
              Create account
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
