const ConsentCard = ({ consent, onActivate }) => {
  return (
    <div className="consent-card">
      <div className="consent-header-info">
        <div className="consent-purpose">
          {consent.purpose}
        </div>

        <span className={`consent-status ${consent.status}`}>
          {consent.status}
        </span>
      </div>

      <div className="consent-details">
        <div className="consent-detail-item">
          <strong>Patient</strong>
          <span>{consent.patientId}</span>
        </div>

        <div className="consent-detail-item">
          <strong>Created</strong>
          <span>
            {consent.createdAt
              ? new Date(consent.createdAt).toLocaleDateString()
              : '—'}
          </span>
        </div>

        <div className="consent-detail-item">
          <strong>Transaction</strong>
          <span className="consent-tx-hash">
            {consent.blockchainTxHash
              ? `${consent.blockchainTxHash.slice(0, 10)}…`
              : '—'}
          </span>
        </div>
      </div>

      {consent.status === 'pending' && (
        <div className="consent-actions">
          <button
            className="action-btn primary"
            onClick={() => onActivate(consent.id, 'active')}
          >
            Activate
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsentCard;

