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
            <div key={record.id} className="record-card">
              <div className="record-header">
                <div className="record-title">{record.title}</div>
                <span className={`record-type ${record.type}`}>
                  {record.type}
                </span>
              </div>

              <div className="record-description">
                {record.description}
              </div>

              <div className="record-meta">
                <div className="record-meta-item">
                  <strong>Date:</strong>{' '}
                  {new Date(record.date).toLocaleDateString()}
                </div>

                <div className="record-meta-item">
                  <strong>Doctor:</strong> {record.doctor}
                </div>

                <div className="record-meta-item">
                  <strong>Hospital:</strong> {record.hospital}
                </div>

                <span className={`record-status ${record.status}`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientRecordsSection;
