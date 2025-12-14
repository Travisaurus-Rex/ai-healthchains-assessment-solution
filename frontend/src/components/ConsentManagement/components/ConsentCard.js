import { useState } from "react";
import AsyncButton from '../../_shared/AsyncButton/AsyncButton';

const ConsentCard = ({ consent, onActivate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleActivate = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      await onActivate(consent.id, 'active');
    } catch (err) {
      setError('Failed to activate consent');
    } finally {
      setIsUpdating(false);
    }
  };

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
          <AsyncButton
            className="action-btn primary"
            onClick={handleActivate}
            isLoading={isUpdating}
            loadingText="Activating…"
          >
            Activate
          </AsyncButton>
          { error &&
            <div className="error-text">{error}</div>
          }
        </div>
      )}
    </div>
  );
};

export default ConsentCard;

