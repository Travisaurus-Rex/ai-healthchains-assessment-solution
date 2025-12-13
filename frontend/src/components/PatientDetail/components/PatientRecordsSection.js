import PatientRecordCard from './PatientRecordCard';

const PatientRecordsSection = ({ records }) => {
  return (
    <div className="patient-records-section">
      <h2>Medical Records ({records.length})</h2>

      {records.length === 0 ? (
        <div className="placeholder">
          <p>No medical records found</p>
        </div>
      ) : (
        <div className="records-list">
          {records.map(record => (
            <PatientRecordCard
              key={record.id}
              record={record}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientRecordsSection;
