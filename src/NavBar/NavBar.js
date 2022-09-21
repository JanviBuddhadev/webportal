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
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Student Managment Portal</a>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            onChange={onchangeHandler}
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button class="btn btn-outline-dark" type="submit" onClick={Search} >
            Search
          </button>
          <button class="btn btn-outline-danger" style={{marginLeft:20}} type="submit" onClick={LogOut}>
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
