const PatientCard = ({ patient, onSelect }) => {
  return (
    <div
      className="patient-card"
      onClick={() => onSelect(patient.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(patient.id);
        }
      }}
    >
      {/* Header */}
      <div className="patient-card-header">
        <div>
          <div className="patient-name">{patient.name}</div>
          <div className="patient-id">{patient.patientId}</div>
        </div>
      </div>

      {/* Core info */}
      <div className="patient-info">
        <div className="patient-info-item">
          <strong>Email:</strong>
          <span>{patient.email}</span>
        </div>

        <div className="patient-info-item">
          <strong>Gender:</strong>
          <span>{patient.gender}</span>
        </div>

        <div className="patient-info-item">
          <strong>DOB:</strong>
          <span>{patient.dateOfBirth}</span>
        </div>
      </div>

      {/* Wallet */}
      <div className="patient-wallet">
        {patient.walletAddress
          ? `Wallet: ${patient.walletAddress.slice(0, 10)}…`
          : 'No wallet connected'}
      </div>
    </div>
  );
};

export default PatientCard;


