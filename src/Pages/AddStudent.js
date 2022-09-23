import React, { Component, Fragment } from "react";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import swal from "sweetalert";
class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AdminUserName: "",
      AdminId: "",
      UserName: "",
      Id: "",
      Dob: "",
      BloodGroup: "",
      CPI: "",
      Address: "",
      Gender: "",
      Email: "",
    };
  }
  componentDidMount = (e) => {
    var authToken = localStorage.getItem("authToken");
    fetch("https://localhost:5001/api/accounts/GetDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        this.setState({
          AdminUserName: data.userName,
          AdminId: data.id,
        });
        console.log(this.state.AdminUserName);
        console.log(this.state.AdminId);
      });
    });
  };

  handleChangeUN = (e) => {
    this.setState({ UserName: e.target.value });
  };
  handleChangeAddress = (e) => {
    this.setState({
      Address: e.target.value,
    });
  };
  handleChangeDOB = (e) => {
    this.setState({
      Dob: e.target.value,
    });
    console.log("dob", e.target.value);
  };
  handleChangeGender = (e) => {
    this.setState({
      Gender: e.target.value,
    });
    console.log("Gender", e.target.value);
  };
  handleChangeCpi = (e) => {
    this.setState({
      CPI: e.target.value,
    });
  };
  handleChangeBloodgroup = (e) => {
    this.setState({
      BloodGroup: e.target.value,
    });
  };
  handleChangeEmail = (e) => {
    this.setState({
      Email: e.target.value,
    });
  };
  AddStudent = (e) => {
    fetch("https://localhost:5001/api/Admin/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Dob: this.state.Dob,
        BloodGroup: this.state.BloodGroup,
        CPI: parseFloat(this.state.CPI),
        Address: this.state.Address,
        Gender: this.state.Gender,
        UserName: this.state.UserName,
        Email: this.state.Email,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 201) {
          console.log(data.message[0].split(":")[1]);
          swal({
            title: "Success",
            text: "Student Added successfully!!",
            icon: "success",
            dangerMode: false,
          }).then(function () {
            fetch("https://localhost:5001/api/accounts/AssignRole", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.message[0].split(":")[1],
                roleName: "Student",
              }),
            }).then((res) => {
              console.log(res);
            });
            window.location.href = "/AdminDashboard";
          });
        } else {
          swal({
            title: "ERROR",
            text: "Error occured",
            icon: "warning",
            dangerMode: true,
          });
        }
        console.log("Api Response", data);
      });
    });
  };
  render() {
    return (
      <div className="Auth-form-container">
        <div className="form" style={{overflowY: 'auto', maxHeight: '650px', scrollbarWidth: 'revert'}}>
          <div className="form-content">
            <div className="form-group mt-3">
              <PersonCircle
                className="bi bi-person-circle"
                size={150}
                style={{ marginTop: 10, marginRight: 10 }}
              ></PersonCircle>

              <label
                style={{
                  fontSize: "50px",
                  marginLeft: "15px",
                  marginTop: "20px",
                }}
                className="Auth-form-title"
              >
                {this.state.AdminUserName}
              </label>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type={"text"}
                placeholder="Enter UserName"
                className="form-control mt-1"
                onChange={this.handleChangeUN}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email Id"
                className="form-control mt-1"
                onChange={this.handleChangeEmail}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>DOB</label>
              <input
                type={"date"}
                className="form-control mt-1"
                onChange={this.handleChangeDOB}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>Gender</label>
              <br></br>
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={this.handleChangeGender}
                checked={this.state.Gender === "Male"}
              />{" "}
              Male
              <input
                type="radio"
                value="Female"
                name="gender"
                style={{ marginLeft: "15px" }}
                onChange={this.handleChangeGender}
                checked={this.state.Gender === "Female"}
              />{" "}
              Female
              <input
                type="radio"
                value="Other"
                name="gender"
                style={{ marginLeft: "15px" }}
                checked={this.state.Gender === "Other"}
                onChange={this.handleChangeGender}
              />{" "}
              Other
            </div>
            <div className="form-group mt-3">
              <label>Blood Group</label>
              <input
                type="text"
                className="form-control mt-1"
                onChange={this.handleChangeBloodgroup}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>CPI</label>
              <input
                type="text"
                className="form-control mt-1"
                onChange={this.handleChangeCpi}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control mt-1"
                onChange={this.handleChangeAddress}
              ></input>
            </div>
            <div className="d-grid gap-2 mt-3">
              {" "}
              <button
                onClick={this.AddStudent}
                className="btn btn-primary"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStudent;
