import React, { Component, Fragment } from "react";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
//import person from "../images/person-circle.svg";
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Id: "",
      Dob: "",
      BloodGroup: "",
      CPI: "",
      Address: "",
      Gender: "",
    };
  }
  componentDidMount = (e) => {
    var authToken = localStorage.getItem("authToken");

    fetch("https://localhost:5001/api/Student/GetDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        this.setState({
          UserName: data.userName,
          Id: data.id,
          Dob: data.dob,
          BloodGroup: data.bloodGroup,
          CPI: data.cpi,
          Address: data.address,
          Gender: data.gender,
        });
        console.log(this.state.UserName);
      });
    });
  };
  render() {
    if (this.state.authToken) {
      const defaultValue = this.state.Dob.split("T")[0]; // yyyy-mm-dd<input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} />
      console.log("result", defaultValue);
      return (
        <div className="Auth-form-container">
          <div
            className="form"
            style={{
              overflowY: "auto",
              maxHeight: "600px",
              scrollbarWidth: "revert",
            }}
          >
            <h4 style={{ float: "left", marginLeft: "30px" }}>
              {" "}
              Student Management Portal{" "}
            </h4>
            <br></br>
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
                  {this.state.UserName}
                </label>
              </div>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  value={this.state.UserName}
                  disabled
                ></input>
              </div>
              <div className="form-group mt-3">
                <label>DOB</label>
                <input
                  type={"date"}
                  className="form-control mt-1"
                  defaultValue={defaultValue}
                  disabled
                ></input>
              </div>
              <div className="form-group mt-3">
                <label>Gender</label>
                <br></br>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  disabled
                  checked={this.state.Gender === "Male"}
                />{" "}
                Male
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  style={{ marginLeft: "15px" }}
                  disabled
                  checked={this.state.Gender === "Female"}
                />{" "}
                Female
                <input
                  type="radio"
                  value="Other"
                  name="gender"
                  style={{ marginLeft: "15px" }}
                  checked={this.state.Gender === "Other"}
                />{" "}
                Other
              </div>
              <div className="form-group mt-3">
                <label>Blood Group</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  value={this.state.BloodGroup}
                  disabled
                ></input>
              </div>
              <div className="form-group mt-3">
                <label>CPI</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  value={this.state.CPI}
                  disabled
                ></input>
              </div>
              <div className="form-group mt-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  value={this.state.Address}
                  disabled
                ></input>
              </div>
              <div className="d-grid gap-2 mt-3">
                {" "}
                <label>
                  TO UPDATE ANY INFOMATION KINDLY MAIL TO :
                  studentportal@gmail.com
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      window.location.href = "/";
    }
  }
}

export default StudentDashboard;
