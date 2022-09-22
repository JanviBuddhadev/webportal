import React, { Component, Fragment } from "react";
import { PersonCircle, Pencil, Trash3 } from "react-bootstrap-icons";
import { Container, Card, Row } from "react-bootstrap";
import Table from "./Table";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [""],
      UserName: "",
      Id: "",
    };
  }
  AddStudent = (event) => {
    window.location.href = "/AddStudent";
  };
  DeleteStudent = (event) => {
    window.location.href = "/DeleteStudent?id=" + event.target.id;
  };
  EditStudent = (event) => {
    event.preventDefault();
    window.location.href = "/EditStudent?id=" + event.target.id;
  };

  tabRow() {
    return this.state.students.map(function (object, i) {
      return <Table obj={object} key={i} />;
    });
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
      res
        .json()
        .then((data) => {
          this.setState({
            UserName: data.userName,
            Id: data.id,
          });
          console.log(this.state.UserName);
          console.log(this.state.Id);
        })
        .then(() => {
          fetch("https://localhost:5001/api/accounts/Students", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }).then((res) => {
            res.json().then((data) => {
              console.log(data);
              this.setState({ students: data });
              console.log(this.state.students);
              for (var i = 0; i < data.length; i++) {
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
      <div className="Auth-form-container">
        <div className="form">
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
              <button
                onClick={this.AddStudent}
                type="button"
                className="btn btn-dark text-end"
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  float: "right",
                }}
              >
                Add Student
              </button>
            </div>
            <table className="table table-striped" style={{ marginTop: 10 }}>
              <thead></thead>
              <tbody>{this.tabRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
