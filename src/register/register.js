import { Component } from "react";
// import { Container, state } from "react-bootstrap";
import axios from "axios";
import "./register.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    conform_password: "",
  };

  submitUser = (e) => {
    e.preventDefault();
    const userData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      conform_password: this.state.conform_password,
    };

    axios
      .post("http://127.0.0.1:8000/todo/registration/", userData)
      .then((response) => {
        swal({
          title: "Success!!",
          text: "Registration done",
          icon: "success",
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="register">
        <div className="register_container">
          <h1>Register</h1>
          <form>
            <h5>First name</h5>
            <input
              type="text"
              value={this.state.firstname}
              onChange={(event) => {
                this.setState({ firstname: event.target.value });
              }}
            />
            <h5>Last name</h5>
            <input
              type="text"
              value={this.state.lastname}
              onChange={(event) => {
                this.setState({ lastname: event.target.value });
              }}
            />
            <h5>Email</h5>
            <input
              type="text"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />

            <h5>Confirm password</h5>
            <input
              type="password"
              value={this.state.conform_password}
              onChange={(event) => {
                this.setState({ conform_password: event.target.value });
              }}
            />

            <button
              className="register_btn btn text-black btn-outline-primary mr-3"
              onClick={this.submitUser}
            >
              Submit
            </button>
            <Link to="/login">
              <button className="register_btn btn text-black btn-outline-primary mr-3">
                Already have an account
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
