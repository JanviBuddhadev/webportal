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
            icon: "Success",
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
   
    console.log("result",defaultValue);
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
                  Update Student Information
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
                  {this.state.UserName}
                </Card.Title>
                <Card.Subtitle
                  className="mb-5 text-muted"
                  style={{ fontSize: 30 }}
                >
                  ID:{this.state.Id}
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
                          <input
                            type={"text"}
                            value={this.state.UserName}
                            onChange={this.handleChangeUN}
                            disabled
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>DOB</td>
                        <td>
                          <input
                            type={"date"}
                            defaultValue={defaultValue}
                            onChange={this.handleChangeDOB}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>
                          {" "}
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
                            style={{ marginLeft: 10 }}
                            onChange={this.handleChangeGender}
                            checked={this.state.Gender === "Female"}
                          />{" "}
                          Female
                          <input
                            type="radio"
                            value="Other"
                            name="gender"
                            style={{ marginLeft: 10 }}
                            checked={this.state.Gender === "Other"}
                            onChange={this.handleChangeGender}
                          />{" "}
                          Other{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Blood Group</td>
                        <td>
                          <input
                            type={"text"}
                            value={this.state.BloodGroup}
                            onChange={this.handleChangeBloodgroup}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>CPI</td>
                        <td>
                          <input
                            type={"text"}
                            value={this.state.CPI}
                            onChange={this.handleChangeCpi}
                          ></input>
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
                            onChange={this.handleChangeAddress}
                            value={this.state.Address}
                          ></textarea>
                        </td>
                      </tr>
                    </td>
                  </tr>
                  <tr>
                    <button
                      type="button"
                      class="btn btn-dark text-center"
                      style={{ width: 100, marginLeft: 450, marginTop: 25 }}
                      onClick={this.UpdateStudentDetails}
                    >
                      {" "}
                      Update{" "}
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

export default EditStudent;
