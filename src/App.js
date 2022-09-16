import logo from './logo.svg';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import {BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './Pages/AdminDashboard';
import { Fragment } from 'react';
import NavBar from './NavBar/NavBar';
import AddStudent from './Pages/AddStudent';
import EditStudent from './Pages/EditStudent';
import DeleteStudent from './Pages/DeleteStudent';
import StudentDashboard from './Pages/StudentDashboard';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  return (
    <div className="App">    
     <Fragment>
     {window.location.pathname === '/' || window.location.pathname === '/Login' || window.location.pathname === '/GeneratePassword'  ? null
      : <NavBar></NavBar>}
      
      <BrowserRouter>
        <Routes>
              <Route index element={<Login />}></Route>
              <Route exact path='/AdminDashboard'  element={<AdminDashboard />}></Route>
              <Route exact path='/StudentDashboard'  element={<StudentDashboard />}></Route>
              <Route exact path='/Addstudent'  element={<AddStudent />}></Route>
              <Route exact path='/EditStudent'  element={<EditStudent />}></Route>
              <Route exact path='/DeleteStudent'  element={<DeleteStudent />}></Route>
              <Route exact path='/GeneratePassword'  element={<ForgotPassword />}></Route>
          </Routes>  
      </BrowserRouter>
              
     </Fragment>

    </div>
  );
}

export default App;
