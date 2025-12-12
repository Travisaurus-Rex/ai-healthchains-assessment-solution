import React, { useState, useEffect } from 'react';
import './ConsentManagement.css';
import { apiService } from '../services/apiService';
import { useWeb3 } from '../hooks/useWeb3';

const ConsentManagement = ({ account }) => {
  const { signMessage } = useWeb3();
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    purpose: '',
  });

  // fetchConsents function implemented
  const fetchConsents = async () => {
    setLoading(true);
    try {
      const status = filterStatus === 'all' ? null : filterStatus;
      const { consents } = await apiService.getConsents(null, status);
      setConsents(Array.isArray(consents) ? consents : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsents();
  }, [filterStatus]);

  // createConsent function implemented
  const handleCreateConsent = async (e) => {
    e.preventDefault();

    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // 1. Build a clear, auditable message
      const message = `I consent to "${formData.purpose}" for patient "${formData.patientId}"`;

      // 2. Ask MetaMask to sign it
      const signature = await signMessage(message);

      // 3. Send consent to backend
      const response = await apiService.createConsent({
        patientId: formData.patientId,
        purpose: formData.purpose,
        walletAddress: account,
        signature,
      });

      // 4. Refresh consent list (same logic as fetch)
      const status = filterStatus === 'all' ? null : filterStatus;
      const { consents } = await apiService.getConsents(null, status);
      setConsents(Array.isArray(consents) ? consents : []);

      // 5. Reset UI
      setFormData({ patientId: '', purpose: '' });
      setShowCreateForm(false);
    } catch (err) {
      alert('Failed to create consent: ' + err.message);
    }
  };


  // TODO: Implement updateConsentStatus function
  // This should update a consent's status (e.g., from pending to active)
  const handleUpdateStatus = async (consentId, newStatus) => {
    try {
      // TODO: Call apiService.updateConsent to update the status
      // TODO: Refresh consents list
    } catch (err) {
      alert('Failed to update consent: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="consent-management-container">
        <div className="loading">Loading consents...</div>
      </div>
    );
  }

  if (error) {
  return (
    <div className="error">
      <div className="error-content">
        <div className="error-text">
          <strong>Something went wrong</strong>
          <div className="error-message">{error}</div>
        </div>

        <button
          type="button"
          className="error-retry"
          onClick={fetchConsents}
        >
          Retry
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="consent-management-container">
      <div className="consent-header">
        <h2>Consent Management</h2>
        <button
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={!account}
        >
          {showCreateForm ? 'Cancel' : 'Create New Consent'}
        </button>
      </div>

      {!account && (
        <div className="warning">
          Please connect your MetaMask wallet to manage consents
        </div>
      )}

      {showCreateForm && account && (
        <div className="create-consent-form">
          <h3>Create New Consent</h3>
          <form onSubmit={handleCreateConsent}>
            <div className="form-group">
              <label>Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                placeholder="e.g., patient-001"
              />
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              >
                <option value="">Select purpose...</option>
                <option value="Research Study Participation">Research Study Participation</option>
                <option value="Data Sharing with Research Institution">Data Sharing with Research Institution</option>
                <option value="Third-Party Analytics Access">Third-Party Analytics Access</option>
                <option value="Insurance Provider Access">Insurance Provider Access</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Sign & Create Consent
            </button>
          </form>
        </div>
      )}

      <div className="consent-filters">
        <button
          className={filterStatus === 'all' ? 'active' : ''}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button
          className={filterStatus === 'active' ? 'active' : ''}
          onClick={() => setFilterStatus('active')}
        >
          Active
        </button>
        <button
          className={filterStatus === 'pending' ? 'active' : ''}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
      </div>

      {/* TODO: Display consents list */}
      <div className="consents-list">
        {!account ? null : consents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                    10-4.48 10-10S17.52 2 12 2zm0 15h-1v-6h2v6h-1zm0-8h-1V7h2v2h-1z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <span>No consents found.</span>
          </div>
        ) : (
          consents.map((consent) => (
            <div key={consent.id} className="consent-card">
              <div className={`consent-status-banner ${consent.status}`}>
                {consent.status}
              </div>

              <div className="consent-body">
                <div className="consent-row">
                  <span className="consent-label">Patient ID</span>
                  <span className="consent-value">{consent.patientId}</span>
                </div>

                <div className="consent-row">
                  <span className="consent-label">Purpose</span>
                  <span className="consent-value">{consent.purpose}</span>
                </div>

                <div className="consent-row">
                  <span className="consent-label">Created</span>
                  <span className="consent-value">
                    {consent.createdAt
                      ? new Date(consent.createdAt).toLocaleString()
                      : '—'}
                  </span>
                </div>

                <div className="consent-row">
                  <span className="consent-label">Transaction</span>
                  <span className="consent-value">
                    {consent.blockchainTxHash
                      ? `${consent.blockchainTxHash.slice(0, 10)}…`
                      : '—'}
                  </span>
                </div>

                {consent.status === 'pending' && (
                  <button
                    className="activate-btn"
                    onClick={() => handleUpdateStatus(consent.id, 'active')}
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsentManagement;


