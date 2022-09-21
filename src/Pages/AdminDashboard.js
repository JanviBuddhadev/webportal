import React, { Component, Fragment } from "react";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';  
import { Container, Card, Col, Button, Row } from "react-bootstrap";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students:[""],
      UserName: "",
      Id: "",
    };
  }
  AddStudent = (event)=>{
    window.location.href = "/AddStudent";
}
DeleteStudent = (event)=>{
    window.location.href = "/DeleteStudent?id="+event.target.id;
}
EditStudent = (event)=>{
 event.preventDefault();
    window.location.href = "/EditStudent?id="+event.target.id;
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
        UserName: data.userName,
        Id: data.id
      });
      console.log(this.state.UserName);
      console.log(this.state.Id);
    }).then(()=>{
      fetch("https://localhost:5001/api/accounts/Students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      res.json().then((data) => { 
        console.log(data);   
        this.setState({students : data})
        console.log(this.state.students);
        for(var i = 0; i < data.length; i++){
          console.log(data[i].username);
          console.log(data[i].userID);
        }
      });
    });
    });
  });
};

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
            {this.state.students.map(
              (variant, idx) => (
                <Fragment><Card 
                        onClick={() => this.EditStudent(variant.userID)}
                        data-id={variant.userID}
                        style={{ border:"none"}}
                        key={idx}
                        text={"dark"}
                        className="col-lg-10 col-sm-1 col-md-4"
                    >
                        <Card.Body>
                            <Card.Header>
                                {variant.username}
                            </Card.Header>
                        </Card.Body>
                    </Card>
                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-primary" onClick={this.EditStudent} id={variant.userID}><Pencil></Pencil></button>
                        </Card.Body>
                    </Card>

                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-danger justify-content-center" id={variant.userID} onClick={this.DeleteStudent}><Trash3></Trash3> </button>
                        </Card.Body>
                    </Card>
                </Fragment>
              )
            )}
          </Row>

          
        </Container>
      </Fragment>
    );
  }
}

export default AdminDashboard;
