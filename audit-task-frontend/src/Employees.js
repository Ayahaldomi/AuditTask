// src/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7246/api/Employee/getAllEmployees');
        setEmployeeData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://localhost:7246/api/Employee/deleteEmployee/${id}`,{
          headers: {
            'User-Id': 1 // to pass userid static because there is no login page
          }
        });
        setEmployeeData(employeeData.filter((emp) => emp.id !== id));
        Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the employee.', 'error');
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee Information</h1>
      <div className="text-start mb-3">
        <a href="/CreateEmployee" className="btn btn-primary">Create Employee</a>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ width: '100%', maxHeight: '500px', overflowY: 'auto' }}>
          <Table striped bordered hover responsive size="md">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department.name}</td>
                  <td>
                    <a href={`/EmployeeDetails/${emp.id}`} className="btn btn-outline-info btn-sm me-2">
                      View
                    </a>
                    <a href={`/EditEmployees/${emp.id}`} className="btn btn-outline-warning btn-sm me-2">
                      Edit
                    </a>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteEmployee(emp.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
