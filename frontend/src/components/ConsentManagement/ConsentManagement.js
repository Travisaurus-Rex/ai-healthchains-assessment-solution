import React, { useState, useEffect } from 'react';
import './ConsentManagement.css';
import { apiService } from '../../services/apiService';
import { useWeb3 } from '../../hooks/useWeb3';
import ConsentEmptyState from './components/ConsentEmptyState';
import ConsentErrorState from './components/ConsentErrorState';
import ConsentFilters from './components/ConsentFilters';
import ConsentCard from './components/ConsentCard';
import ConsentCreateForm from './components/ConsentCreateForm';

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


  // updateConsentStatus function implemented
  const handleUpdateStatus = async (consentId, newStatus) => {
    try {
      await apiService.updateConsent(consentId, {
        status: newStatus,
        blockchainTxHash: `0x${Math.random().toString(16).slice(2, 10)}`,
      });

      const status = filterStatus === 'all' ? null : filterStatus;

      const { consents: updated } = await apiService.getConsents(null, status);

      setConsents(Array.isArray(updated) ? updated : []);
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
    return <ConsentErrorState error={error} onRetry={fetchConsents} />
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
        <ConsentCreateForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateConsent}
        />
      )}

      <ConsentFilters
        filterStatus={filterStatus}
        onChange={setFilterStatus}
      />

      <div className="consents-list">
        {!account ? null : consents.length === 0 ? (
          <ConsentEmptyState />
        ) : (
          consents.map((consent) => (
            <ConsentCard 
              key={consent.id} 
              consent={consent} 
              onActivate={handleUpdateStatus} />
          ))
        )}
      </div>
    </div>
  );
};

export default ConsentManagement;


