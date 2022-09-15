import React, { Component, Fragment } from "react";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';  
import { Container, Card, Col, Button, Row } from "react-bootstrap";

//import person from "../images/person-circle.svg";
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }
  AddStudent = (event)=>{
    window.location.href = "/AddStudent";
}
DeleteStudent = (event)=>{
    window.location.href = "/DeleteStudent";
}
EditStudent = (event)=>{
    window.location.href = "/EditStudent";
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
                  Super admin
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
            <div className="col-lg-12 col-sm-3 col-md-6 ">
              <button
              onClick={this.AddStudent}
                type="button"
                className="btn btn-dark text-end"
                style={{ marginTop: 10, marginBottom: 10, float: "right" }}
              >
                Add Student
                {/* <Link to={"/AddStudent"} >Add Student</Link>   */}
              </button>
            </div>
          </Row>

          <Row>
            {["Aman Pandey", "Ankit Shah", "Janvi Buddhadev"].map(
              (variant, idx) => (
                <Fragment><Card
                        style={{ border:"none"}}
                        key={idx}
                        text={"dark"}
                        className="col-lg-10 col-sm-1 col-md-4"
                    >
                        <Card.Body>
                            <Card.Header>
                                {variant}
                            </Card.Header>
                        </Card.Body>
                    </Card>
                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-primary" onClick={this.EditStudent}><Pencil></Pencil></button>
                        </Card.Body>
                    </Card>

                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-danger justify-content-center" onClick={this.DeleteStudent}><Trash3></Trash3> </button>
                        </Card.Body>
                    </Card>
                </Fragment>
              )
            )}
          </Row>

          {/* <ul class="list-group">
            <li class="list-group-item">Aman Pandey</li>
            <li class="list-group-item">Janvi Buddhadev</li>
            <li class="list-group-item">Vivek Zalariya</li>
            <li class="list-group-item">Manav Shah</li>
            <li class="list-group-item">Ankit Shah</li>
          </ul> */}
        </Container>
      </Fragment>
    );
  }
}

export default AdminDashboard;
