import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Position: '',
    DepartmentId: '',
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch departments when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://localhost:7246/api/Department/getAllDepartment');
        setDepartments(response.data); // Assuming response.data is an array of department objects
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7246/api/Employee/postEmployees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-Id': 1 // to pass userid static because there is no login page
        },
      });
      setFormData({ Name: '', Position: '', DepartmentId: '' });
      
      // Display SweetAlert and redirect
      Swal.fire({
        title: 'Success!',
        text: 'Employee created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/employees'); // Redirect to employees page
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to create Employee: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Audit</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            name="Name"
            id="name"
            value={formData.Name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter employee name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position:</label>
          <input
            type="text"
            name="Position"
            id="position"
            value={formData.Position}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter employee position"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department:</label>
          <select
            name="DepartmentId"
            id="department"
            value={formData.DepartmentId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Audit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
