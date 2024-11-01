import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [Employee, setEmp] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7246/api/Employee/getEmployeeById/${id}`,{
          headers: {
            'User-Id': 1 // to pass userid static because there is no login page
          }
        });
        setEmp(response.data);
      } catch (error) {
        console.error('Error fetching Employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (!Employee) return <p className="text-center mt-5">Loading Employee details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Employee Details</h2>
        </div>
        <div className="card-body">
          <h5 className="card-subtitle mb-3 text-muted">Employee ID: {id}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Name:</strong> {Employee.name}
            </li>
            <li className="list-group-item">
              <strong>Position:</strong> {Employee.position}
            </li>
            <li className="list-group-item">
              <strong>Department:</strong> {Employee.department.name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
