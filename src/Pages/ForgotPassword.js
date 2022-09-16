import React, { Component } from "react";
import { ConeStriped } from "react-bootstrap-icons";
import swal from 'sweetalert';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: ''
    };
  }

handleChangeUN= (e)=> {  
  this.setState({Username:e.target.value}); 
  }  
  handleChangePW= (e)=> {  
    this.setState({Password:e.target.value}); 
    }   
    
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
                type="password"
                className="form-control mt-1"
                onChange={this.handleChangePW} 
                placeholder="Enter Secret Code"
                value={this.state.Password}
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
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={this.Login}>
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
