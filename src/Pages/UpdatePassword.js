import React, { Component } from "react";
import { ConeStriped } from "react-bootstrap-icons";
import swal from "sweetalert";
class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      OTP: "",
    };
  }

  UpdatePassword = (e) => {
    e.preventDefault();
    fetch("https://localhost:5001/api/accounts/ResetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        emailAddress: this.state.Username,
        NewPassword: this.state.Password,
        SecretCode: this.state.OTP
      }),
    }).then((res) => {
      if (res.status == 200) {
        swal({
          title: "Success",
          text: "Password updated successfully!!!",
          icon: "Success",
          dangerMode: false,
        }).then(function () {
          window.location.href = "/";
        });
      } else {
        swal({
          title: "ERROR",
          text: "Something went wrong....",
          icon: "warning",
          dangerMode: true,
        });
      }
    });
  };



  handleChangeUN = (e) => {
    this.setState({ Username: e.target.value });
  };
  handleChangePW = (e) => {
    this.setState({ Password: e.target.value });
  };

  handleChangeOTP = (e) => {
    this.setState({ OTP: e.target.value });
  };
  render() {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Update Password</h3>
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
              <label>OTP</label>
              <input
                type="text"
                className="form-control mt-1"
                onChange={this.handleChangeOTP}
                placeholder="Enter Secret Code"
                value={this.state.OTP}
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control mt-1"
                onChange={this.handleChangePW}
                placeholder="Enter password"
                value={this.state.Password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.UpdatePassword}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePassword;
