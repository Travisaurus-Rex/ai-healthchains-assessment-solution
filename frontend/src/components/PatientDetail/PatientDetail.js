import React, { useState, useEffect } from 'react';
import './PatientDetail.css';
import { apiService } from '../../services/apiService';
import PatientInfoSection from './components/PatientInfoSection';
import PatientRecordsSection from './components/PatientRecordsSection';

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [patientData, { records }] = await Promise.all([
          apiService.getPatient(patientId),
          apiService.getPatientRecords(patientId),
        ]);
        console.log(patientData);
        console.log(records);
        setPatient(patientData);
        setRecords(records);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">Error loading patient: {error || 'Patient not found'}</div>
        <button onClick={onBack} className="back-btn">Back to List</button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">← Back to List</button>
      </div>

      <div className="patient-detail-content">
        <PatientInfoSection patient={patient} />
        <PatientRecordsSection records={records} />
      </div>

    </div>
  );
};

export default PatientDetail;


