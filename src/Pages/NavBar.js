import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const [searchTB, setsearchTB] = useState("");

  const onchangeHandler = (e) =>
  {
    setsearchTB(e.target.value);
    console.log(searchTB);
  }
  

 const LogOut=(e)=>{
    e.preventDefault(); 
    localStorage.removeItem("authToken");
    window.location.href = '/';
}
const Search=(e)=>{
  e.preventDefault();
  window.location.href = "/Search/?" + `${searchTB}`;
}

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Student Managment Portal</a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            onChange={onchangeHandler}
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button className="btn btn-outline-dark" type="submit" onClick={Search} >
            Search
          </button>
          <button className="btn btn-outline-danger" style={{marginLeft:20}} type="submit" onClick={LogOut}>
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;