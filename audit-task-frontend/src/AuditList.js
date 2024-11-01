import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  

const AuditList = () => {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7246/api/Audit/GetAllAudit');
        setAuditData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteAudit = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this audit entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://localhost:7246/api/Audit/DeleteAudit/${id}`);
        setAuditData(auditData.filter((audit) => audit.id !== id));
        Swal.fire('Deleted!', 'The audit has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the audit.', 'error');
      }
    }
  };

  const getActionVariant = (action) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'success';
      case 'read':
        return 'primary';
      case 'edit':
        return 'warning';
      case 'delete':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="text-center my-6">Audit Information</h1>
      <div className="table-responsive" style={{ maxHeight: '500px' }}>
        <Table striped bordered hover size="md">
          <thead className=" sticky-header">
            <tr>
              <th>User ID</th>
              <th>Employee ID</th>
              <th>Employee</th>
              <th>Action</th>
              <th>More Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {auditData.map((audit) => (
              <tr key={audit.id}>
                <td>{audit.userId}</td>
                <td>{audit.employeeId}</td>
                <td>{audit.employeeName}</td>
                <td>
                  <Button variant={getActionVariant(audit.action)} size="sm" disabled>
                    {audit.action}
                  </Button>
                </td>
                <td><a href={`/AuditDetails/${audit.id}`}>More Info</a></td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteAudit(audit.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AuditList;
