import { useState, useEffect, useCallback } from 'react';
import './PatientList.css';
import { apiService } from '../../services/apiService';
import PatientCard from './components/PatientCard';
import Pagination from './components/Pagination';
import EmptyResults from '../_shared/EmptyResults/EmptyResults';
import ErrorState from '../_shared/ErrorState/ErrorState';
import Loader from '../_shared/Loader/Loader';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
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

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm, fetchPatients]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);       // reset pagination on new search
      setSearchTerm(searchInput);
    }, 400); // 300–500ms is standard

    return () => clearTimeout(timeout);
  }, [searchInput]);

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
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search patients..."
            value={searchInput}
            onChange={handleSearch}
          />

          {searchInput && (
            <button
              type="button"
              className="search-clear"
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
                setCurrentPage(1);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
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


