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
  handleChangeEmail =(e)=>{
    this.setState({
      Email: e.target.value,
    });
  }
  AddStudent = (e) => {
    fetch("https://localhost:5001/api/Admin/Register" , {
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
        Email:this.state.Email
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 201) {
          console.log(data.message[0].split(":")[1]);
          swal({
            title: "Success",
            text: "Student Added successfully!!",
            icon: "Success",
            dangerMode: false,
          }).then(function () {
            fetch("https://localhost:5001/api/accounts/AssignRole" , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "userId": data.message[0].split(":")[1],
                "roleName": "Student"
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
      <Fragment>
        <Container style={{ border: "solid", marginTop: "15px" }}>
          <Row>
            <Card
              style={{ display: "-webkit-inline-box" }}
              className="col-lg-12 col-sm-3 col-md-6 "
            >
              <Card.Body>
                <Card.Title
                  className="justify-content-center"
                  style={{ fontSize: 30 }}
                >
                  Add Student
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card
              style={{ display: "-webkit-inline-box" }}
              className="col-lg-12 col-sm-3 col-md-6"
            >
              <PersonCircle
                className="bi bi-person-circle"
                size={200}
                style={{ margin: 20 }}
              ></PersonCircle>
              <Card.Body>
                <Card.Title style={{ fontSize: 50, marginTop: 50 }}>
                  {this.state.AdminUserName}
                </Card.Title>
                <Card.Subtitle
                  className="mb-5 text-muted"
                  style={{ fontSize: 30 }}
                >
                  ID : {this.state.AdminId}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card
              style={{ display: "-webkit-inline-box" }}
              className="col-lg-12 col-sm-3 col-md-6 "
            >
              <Card.Body>
                <table style={{ margin: 30, fontSize: 22 }}>
                  <tr>
                    <td>
                      <tr>
                        <td style={{ width: 150 }}>Name</td>
                        <td style={{ width: 300 }}>
                          {" "}
                          <input type={"text"} placeholder="Enter UserName"
                            onChange={this.handleChangeUN}></input>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: 150 }}>Email</td>
                        <td style={{ width: 300 }}>
                          {" "}
                          <input type={"text"}  placeholder="Enter Email"
                            onChange={this.handleChangeEmail}></input>
                        </td>
                      </tr>
                      <tr>
                        <td>DOB</td>
                        <td>
                          <input type={"date"} 
                            onChange={this.handleChangeDOB}></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>
                          {" "}
                          <input type="radio" value="Male" name="gender" onChange={this.handleChangeGender}/> Male
                          <input
                            type="radio"
                            value="Female"
                            name="gender"
                            style={{ marginLeft: 10 }}
                            onChange={this.handleChangeGender}
                          />{" "}
                          Female
                          <input
                            type="radio"
                            value="Other"
                            name="gender"
                            style={{ marginLeft: 10 }}
                            onChange={this.handleChangeGender}
                          />{" "}
                          Other{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Blood Group</td>
                        <td>
                          <input type={"text"} onChange={this.handleChangeBloodgroup} placeholder="Enter BloodGroup"></input>
                        </td>
                      </tr>
                      <tr>
                        <td>CPI</td>
                        <td>
                          <input type={"text"} onChange={this.handleChangeCpi} placeholder="Enter CPI"></input>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td style={{ width: 70 }}> Address</td>
                        <td style={{ width: 150 }}>
                          <textarea
                            id="story"
                            name="story"
                            rows="5"
                            cols="33"
                            onChange={this.handleChangeAddress} placeholder="Enter Address"
                          ></textarea>
                        </td>
                      </tr>
                    </td>
                  </tr>
                  <tr>
                    <button
                      type="button"
                      class="btn btn-outline-dark text-center"
                      onClick={this.AddStudent}
                      style={{ width: 100, marginLeft: 450, marginTop: 25 }}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </tr>
                </table>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default AddStudent;
