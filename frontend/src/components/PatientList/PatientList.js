import { useState, useEffect, useCallback } from 'react';
import './PatientList.css';
import { apiService } from '../../services/apiService';
import PatientSearch from './components/PatientSearch';
import PatientCard from './components/PatientCard';
import Pagination from './components/Pagination';
import EmptyResults from '../_shared/EmptyResults/EmptyResults';
import ErrorState from '../_shared/ErrorState/ErrorState';
import Loader from '../_shared/Loader/Loader';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getPatients(
        currentPage,
        undefined,
        searchTerm
      );
      
      setPatients(data.patients);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm, fetchPatients]);

  if (error) {
    return (
      <div className="patient-list-container">
         <ErrorState
          title="Failed to load patients"
          message={error}
          onRetry={fetchPatients}
        />
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        
        <PatientSearch
          onSearch={(term) => {
            setCurrentPage(1);
            setSearchTerm(term);
          }}
          onClear={() => {
            setCurrentPage(1);
            setSearchTerm('');
          }}
        />
      </div>

        {loading ? (
          <Loader />
        ) : patients.length === 0 ? (
          <EmptyResults
            title="No patients found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <div className="patient-list">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSelect={onSelectPatient}
              />
            ))}
          </div>
        )}

      <Pagination
        pagination={pagination}
        onPageChange={setCurrentPage}
      />

    </div>
  );
};

export default PatientList;


