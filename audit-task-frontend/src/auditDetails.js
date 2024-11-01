// src/AuditDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuditDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [audit, setAudit] = useState(null);

  useEffect(() => {
    const fetchAuditDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7246/api/Audit/GetAuditById/${id}`);
        setAudit(response.data);
      } catch (error) {
        console.error('Error fetching audit details:', error);
      }
    };

    fetchAuditDetails();
  }, [id]);

  if (!audit) return <p className="text-center mt-5">Loading audit details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Audit Details</h2>
        </div>
        <div className="card-body">
          <h5 className="card-subtitle mb-3 text-muted">Audit ID: {id}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Action:</strong> {audit.action}
            </li>
            <li className="list-group-item">
              <strong>Employee:</strong> {audit.employeeName}
            </li>
            <li className="list-group-item">
              <strong>Employee ID:</strong> {audit.employeeId}
            </li>
            <li className="list-group-item">
              <strong>User ID:</strong> {audit.userId}
            </li>
            <li className="list-group-item">
              <strong>Timestamp:</strong> {audit.timestamp}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuditDetails;
