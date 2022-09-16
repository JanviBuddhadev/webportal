import React, { Component } from "react";
import { Check, ConeStriped } from "react-bootstrap-icons";
import swal from "sweetalert";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      IsEmailConfirmed: false,
    };
  }

  Login = (e) => {
    e.preventDefault();
    console.log(this.state.Username);
    console.log(this.state.Password);
    fetch("https://localhost:5001/api/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        emailAddress: this.state.Username,
        password: this.state.Password,
      }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          var authToken = data.token;
          localStorage.setItem("authToken", authToken);
          this.setState({
            IsEmailConfirmed: data.isEmailConfimed,
          });
          console.log(data);
          fetch(
            "https://localhost:5001/api/accounts/GetUserRole?email=" +
              this.state.Username,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          ).then((res) => {
            res.json().then((data) => {
              if (data === "Admin") {
                window.location.href = "/AdminDashboard";
              } else {
                if (this.state.IsEmailConfirmed) {
                  window.location.href = "/StudentDashboard";
                } 
                else 
                {
                  fetch("https://localhost:5001/api/accounts/verify", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      emailAddress: this.state.Username
                    }),
                  }).then((res)=>{
                    if(res.status == 200){
                      swal({
                        title: "Please check your email!!!",
                        text: "OTP sent successfully on your registered EmailId",
                        icon: "Success",
                        dangerMode: false,
                      });
                      window.location.href = "/GeneratePassword";
                    }
                    else{
                      swal({
                        title: "ERROR",
                        text: "Your Email Id is not registered",
                        icon: "warning",
                        dangerMode: true,
                      });
                    }
                  })
                }
              }
            });
          });
        });
      } else {
        swal({
          title: "Something went wrong!",
          text: "Your Username or password is wrong!!",
          icon: "warning",
          dangerMode: true,
        });
      }
    });
  };

  // handleOnChange = () => {
  //   this.setState({isChecked: true});
  // };
  handleChangeUN = (e) => {
    this.setState({ Username: e.target.value });
  };
  handleChangePW = (e) => {
    this.setState({ Password: e.target.value });
  };

  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                onChange={this.handleChangeUN}
                placeholder="Enter email"
                value={this.state.Username}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                onChange={this.handleChangePW}
                placeholder="Enter password"
                value={this.state.Password}
              />
            </div>
            {/* <div className="isStudent">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                checked={this.state.isChecked}
                onChange={this.handleOnChange}
              />
              First Time Login ?
            </div> */}
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.Login}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              <a href="#">Forgot password</a>

              {/* <a href="#" style={{ marginLeft: "10" }}>
                Generate Password
              </a> */}
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
