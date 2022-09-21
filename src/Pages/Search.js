import React, { Component, Fragment } from "react";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import swal from "sweetalert";
class Search extends Component {
  constructor(props) {
    super(props);
    var path = window.location.href;
    let uriId = path.split("?");
    let id = uriId[1];
    console.log(id);
    this.state={
        ID: id,
        students: [""]
    }
  }
  DeleteStudent = (event)=>{
    window.location.href = "/DeleteStudent?id="+event.target.id;
}
EditStudent = (event)=>{
 event.preventDefault();
    window.location.href = "/EditStudent?id="+event.target.id;
}    
  componentDidMount = (e) => {
    fetch(
      "https://localhost:5001/api/accounts/Search/" + `${this.state.ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.state.authToken}`,
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        this.setState({
            students : data
        });
        console.log("Api Response", data);
        console.log("Student state Response", this.state.students);
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
              
              <Card.Body>
                <Card.Title style={{ fontSize: 50, marginTop: 50 }}>
                  Search Result
                </Card.Title>
                
              </Card.Body>
            </Card>
          </Row>

          <Row>
            {this.state.students.map(
              (variant, idx) => (
                <Fragment><Card 
                        onClick={() => this.EditStudent(variant.id)}
                        data-id={variant.id}
                        style={{ border:"none"}}
                        key={idx}
                        text={"dark"}
                        className="col-lg-10 col-sm-1 col-md-4"
                    >
                        <Card.Body>
                            <Card.Header>
                                {variant.userName}
                            </Card.Header>
                        </Card.Body>
                    </Card>
                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-primary" onClick={this.EditStudent} id={variant.id}><Pencil></Pencil></button>
                        </Card.Body>
                    </Card>

                    <Card 
                        style={{ border:"none"}}
                        className="col-lg-1 col-sm-1 col-md-1">
                        <Card.Body>
                            <button className="btn btn-danger justify-content-center" id={variant.id} onClick={this.DeleteStudent}><Trash3></Trash3> </button>
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

export default Search;