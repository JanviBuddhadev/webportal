import React, { Component } from "react";

import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
  }
  DeleteStudent = (event) => {
    window.location.href = "/DeleteStudent?id=" + event.target.id;
  };
  EditStudent = (event) => {
    event.preventDefault();
    window.location.href = "/EditStudent?id=" + event.target.id;
  };
  render() {
    return (
      <tr>
        <td style={{ width: "70%"}}>{this.props.obj.username}</td>

        <td>
          <button
            onClick={this.EditStudent}
            id={this.props.obj.userID}
            className="btn btn-primary"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            id={this.props.obj.userID}
            onClick={this.DeleteStudent}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Table;
