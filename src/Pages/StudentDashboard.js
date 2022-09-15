import React, { Component, Fragment } from "react";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
//import person from "../images/person-circle.svg";
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Container style={{ border:"solid", marginTop: "15px"}}>
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
                 Janvi Buddhadev
                </Card.Title>
                <Card.Subtitle
                  className="mb-5 text-muted"
                  style={{ fontSize: 30 }}
                >
                  ID : asdsfsdf
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Row>
          

          <Row>
          <table  style={{margin:30, fontSize:22}}>
            <tr>
              <td>
                <tr>
                  <td style={{ width: 150 }}>Name</td>
                  <td style={{ width: 300 }}>
                    {" "}
                    <input type={"text"} value="Janvi Buddhadev"></input>
                  </td>
                </tr>
                <tr >
                  <td>DOB</td>
                  <td>
                    <input type={"date"} value="2022-01-01"></input>
                  </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    {" "}
                    <input type="radio" value="Male" name="gender" /> Male
                    <input type="radio" value="Female" name="gender" checked style={{marginLeft:10}}/> Female
                    <input
                      type="radio"
                      value="Other"
                      name="gender"
                      style={{marginLeft:10}}
                    /> Other{" "}
                  </td>
                </tr>
                <tr>
                  <td>Blood Group</td>
                  <td>
                    <input type={"text"} value="O+"></input>
                  </td>
                </tr>
                <tr>
                  <td>CPI</td>
                  <td>
                    <input type={"text"} value="9.0"></input>
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
                      value="Ahmedabad"
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
