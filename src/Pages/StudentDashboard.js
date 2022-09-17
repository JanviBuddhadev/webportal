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
    return (
      <Fragment>
        <Container style={{ border: "solid", marginTop: "15px" }}>
          <Row>
            <Card
              style={{ display: "-webkit-inline-box" }}
              className="col-lg-12 col-sm-3 col-md-6 "
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
            <table style={{ margin: 30, fontSize: 22 }}>
              <tr>
                <td>
                  <tr>
                    <td style={{ width: 150 }}>Name</td>
                    <td style={{ width: 300 }}>
                      {" "}
                      <input type={"text"} value={this.state.UserName}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>DOB</td>
                    <td>
                      <input type={"date"} value={this.state.Dob}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>
                      {" "}
                      <input type="radio" value="Male" name={this.state.Gender} /> Male
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked
                        style={{ marginLeft: 10 }}
                      />{" "}
                      Female
                      <input
                        type="radio"
                        value="Other"
                        name="gender"
                        style={{ marginLeft: 10 }}
                      />{" "}
                      Other{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Blood Group</td>
                    <td>
                      <input type={"text"} value={this.state.BloodGroup}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>CPI</td>
                    <td>
                      <input type={"text"} value={this.state.CPI}></input>
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
                        value={this.state.Address}
                      ></textarea>
                    </td>
                  </tr>
                </td>
              </tr>
            </table>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default StudentDashboard;
