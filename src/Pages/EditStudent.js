import React, { Component, Fragment } from "react";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import swal from "sweetalert";
class EditStudent extends Component {
  constructor(props) {
    super(props);
    //var authToken = localStorage.getItem("authToken");
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
  UpdateStudentDetails = () => {
    fetch("https://localhost:5001/api/Admin/" + `${this.state.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        Dob: this.state.Dob,
        BloodGroup: this.state.BloodGroup,
        CPI: parseFloat(this.state.CPI),
        Address: this.state.Address,
        Gender: this.state.Gender,
        UserName: this.state.UserName,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 201) {
          swal({
            title: "Success",
            text: "Student's details updated successfully!!!",
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
        <div className="form" style={{overflowY: 'auto', maxHeight: '650px', scrollbarWidth: 'revert'}}>
          <h4 style={{ float: "left", marginLeft: "30px" }}>
            Update Student Details
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
                onChange={this.handleChangeUN}
                disabled
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>DOB</label>
              <input
                type={"date"}
                className="form-control mt-1"
                defaultValue={defaultValue}
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
                value={this.state.BloodGroup}
                onChange={this.handleChangeBloodgroup}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>CPI</label>
              <input
                type="text"
                className="form-control mt-1"
                value={this.state.CPI}
                onChange={this.handleChangeCpi}
              ></input>
            </div>
            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control mt-1"
                value={this.state.Address}
                onChange={this.handleChangeAddress}
              ></input>
            </div>
           <div className="d-grid gap-2 mt-3"> <button
            onClick={this.UpdateStudentDetails}
            
            className="btn btn-primary"
          >
            Update
          </button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditStudent;
