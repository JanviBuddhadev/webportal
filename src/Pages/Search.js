import React, { Component, Fragment } from "react";
import { Container, Card, Col, Button, Row } from "react-bootstrap";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import swal from "sweetalert";
import Table from "./Table";
class Search extends Component {
  constructor(props) {
    super(props);
    var path = window.location.href;
    let uriId = path.split("?");
    let id = uriId[1];
    console.log(id);
    this.state = {
      ID: id,
      students: [""],
      authToken: localStorage.getItem("authToken"),
    };
  }
  tabRow() {
    return this.state.students.map(function (object, i) {
      return <Table obj={object} key={i} />;
    });
  }
  DeleteStudent = (event) => {
    window.location.href = "/DeleteStudent?id=" + event.target.id;
  };
  EditStudent = (event) => {
    event.preventDefault();
    window.location.href = "/EditStudent?id=" + event.target.id;
  };
  componentDidMount = (e) => {
    console.log(this.state.ID);
    fetch("https://localhost:5001/api/accounts/Search/" + `${this.state.ID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.state.authToken}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("data: ");
        console.log(data);
        this.setState({
          students: data,
        });
        console.log("Api Response", data);
        console.log("Student state Response", this.state.students);
      });
    });
  };

  render() {
    if (this.state.authToken) {
      return (
        <div className="Auth-form-container">
          <div className="form">
            <h4 align="center">Search Result</h4>
            <table className="table table-striped" style={{ marginTop: 10 }}>
              <tbody>{this.tabRow()}</tbody>
            </table>
          </div>
        </div>
      );
    } else {
      window.location.href = "/";
    }
  }
}

export default Search;
