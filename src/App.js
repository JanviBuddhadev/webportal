import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import {BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import { Fragment } from "react";
import NavBar from "./Pages/NavBar";
import AddStudent from "./Pages/AddStudent";
import EditStudent from "./Pages/EditStudent";
import DeleteStudent from "./Pages/DeleteStudent";
import StudentDashboard from "./Pages/StudentDashboard";
import UpdatePassword from "./Pages/UpdatePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Search from "./Pages/Search";
import StudentNavbar from './Pages/StudentNavbar';

function App() {
  return (
    <div className="App">
      <Fragment>
        {window.location.pathname === "/" ||
        window.location.pathname === "/Login" ||
        window.location.pathname === "/UpdatePassword" ||
        window.location.pathname === "/verify" ? null : window.location.pathname === '/StudentDashboard' ? (<StudentNavbar></StudentNavbar>)
        :( 
          <NavBar></NavBar>
        )}

        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route
              exact
              path="/AdminDashboard"
              element={<AdminDashboard />}
            ></Route>
            
            <Route
              exact
              path="/StudentDashboard"
              element={<StudentDashboard />}
            ></Route>
            <Route exact path="/Addstudent" element={<AddStudent />}></Route>
            <Route exact path="/EditStudent" element={<EditStudent />}></Route>
            <Route
              exact
              path="/DeleteStudent"
              element={<DeleteStudent />}
            ></Route>
            <Route exact path="/Verify" element={<ForgotPassword />}></Route>
            <Route exact path="/Search" element={<Search />}></Route>
            <Route
              exact
              path="/UpdatePassword"
              element={<UpdatePassword />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
