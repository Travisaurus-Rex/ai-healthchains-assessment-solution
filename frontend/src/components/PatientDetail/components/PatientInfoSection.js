const PatientInfoSection = ({ patient }) => {
  return (
    <div className="patient-info-section">
      <h2>Patient Information</h2>

      <div className="patient-info-grid">
        <Info label="Name" value={patient.name} />
        <Info label="Email" value={patient.email} />
        <Info
          label="Date of Birth"
          value={new Date(patient.dateOfBirth).toLocaleDateString()}
        />
        <Info label="Gender" value={patient.gender} />
        <Info label="Phone" value={patient.phone} />
        <Info label="Address" value={patient.address} />
        <Info
          label="Wallet Address"
          value={patient.walletAddress}
          wallet
        />
      </div>
    </div>
  );
};

const Info = ({ label, value, wallet }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    <span className={`info-value ${wallet ? 'wallet' : ''}`}>
      {value}
    </span>
  </div>
);

export default PatientInfoSection;
