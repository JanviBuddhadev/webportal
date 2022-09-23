import React, { Component } from "react";
import { ConeStriped } from "react-bootstrap-icons";
import swal from "sweetalert";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
    };
  }
  handleChangeUN = (e) => {
    this.setState({ Username: e.target.value });
  };

  ForgotPassword = (e) => {
    e.preventDefault();
    fetch("https://localhost:5001/api/accounts/Verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        emailAddress: this.state.Username,
      }),
    }).then((res) => {
      if (res.status == 200) {
        swal({
          title: "Success",
          text: "Please check your email, OTP sent successfully on your registered EmailId",
          icon: "Success",
          dangerMode: false,
        }).then(function () {
          window.location.href = "/UpdatePassword";
        });
      } else {
        swal({
          title: "ERROR",
          text: "Error occured",
          icon: "warning",
          dangerMode: true,
        });
      }
    });
  };

  render() {
    return (
      <div className="Auth-form-container" style={{ height: "100vh" }}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Verify Email</h3>
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
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.ForgotPassword}
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

export default ForgotPassword;
