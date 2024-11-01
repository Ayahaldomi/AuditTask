import React from 'react';

import './App.css'; // Import CSS file
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AuditList from './AuditList';
import Employees from './Employees';
import CreateEmployee from './CreateEmployee';
import AuditDetails from './auditDetails';
import EmployeeDetails from './EmployeeDetails';
import EditEmployees from './EditEmployees';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>| <Link to="/AuditList">AuditList</Link>
      </nav> */}
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/">AuditList</Nav.Link>
            <Nav.Link href="/Employees">Employees</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>

        <Route path="/" element={<AuditList />} />
        <Route path="/Employees" element={<Employees />} /> 
        <Route path="/CreateEmployee" element={<CreateEmployee />} /> 
        <Route path="/EmployeeDetails/:id" element={<EmployeeDetails />} /> 
        <Route path="/EditEmployees/:id" element={<EditEmployees />} /> 
      </Routes>
    </Router>
  );
}

export default App;
