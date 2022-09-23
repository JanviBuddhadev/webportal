import React, { Component, Fragment } from "react";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import swal from "sweetalert";
class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    var path = window.location.href;
    let uriId = path.split("=");
    let id = uriId[1];
    console.log(id);

    this.state = {
      UserName: "",
      Id: "",
      Dob: "",
      BloodGroup: "",
      CPI: "",
      Address: "",
      Gender: "",
      uid: uriId[1],
      authToken: localStorage.getItem("authToken"),
    };
  }
  componentDidMount = (e) => {
    fetch(
      "https://localhost:5001/api/accounts/GetDetailsUsingID?id=" +
        `${this.state.uid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.state.authToken}`,
        },
      }
    ).then((res) => {
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
        console.log("Api Response", data);
      });
    });
  };
  DeleteStudent = () => {
    fetch(
      "https://localhost:5001/api/Admin/DeleteStudent?id=" +
        `${this.state.uid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        if (res.status === 201) {
          swal({
            title: "Success",
            text: "Student's details Deleted successfully!!!",
            icon: "success",
            dangerMode: false,
          }).then(function () {
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
    const defaultValue = this.state.Dob.split("T")[0]; // yyyy-mm-dd<input id="dateRequired" type="date" name="dateRequired" defaultValue={defaultValue} />
    console.log("result", defaultValue);
    return (
      <div className="Auth-form-container">
        <div
          className="form"
          style={{
            overflowY: "auto",
            maxHeight: "650px",
            scrollbarWidth: "revert",
          }}
        >
          <h4 style={{ float: "left", marginLeft: "30px" }}>Delete Student</h4>
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
              <button onClick={this.DeleteStudent} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteStudent;
