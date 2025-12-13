import { useState, useEffect, useCallback } from 'react';
import './ConsentManagement.css';
import { apiService } from '../../services/apiService';
import { useWeb3 } from '../../hooks/useWeb3';
import ConsentFilters from './components/ConsentFilters';
import ConsentCard from './components/ConsentCard';
import ConsentCreateForm from './components/ConsentCreateForm';
import EmptyResults from '../_shared/EmptyResults/EmptyResults';
import ErrorState from '../_shared/ErrorState/ErrorState';
import Loader from '../_shared/Loader/Loader';

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

  const fetchConsents = useCallback(async () => {
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
  }, [filterStatus]);


  useEffect(() => {
    fetchConsents();
  }, [filterStatus, fetchConsents]);

  const handleCreateConsent = async (e) => {
    e.preventDefault();

    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const message = `I consent to: "${formData.purpose}" for patient: "${formData.patientId}"`;
      const signature = await signMessage(message);
      await apiService.createConsent({
        patientId: formData.patientId,
        purpose: formData.purpose,
        walletAddress: account,
        signature,
      });

      const status = filterStatus === 'all' ? null : filterStatus;
      const { consents } = await apiService.getConsents(null, status);
      setConsents(Array.isArray(consents) ? consents : []);

      setFormData({ patientId: '', purpose: '' });
      setShowCreateForm(false);
    } catch (err) {
      alert('Failed to create consent: ' + err.message);
    }
  };

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


  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="consent-management-container">
        <ErrorState
          title="Failed to load consents"
          message={error}
          onRetry={fetchConsents}
        />
      </div>
    )
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
          <EmptyResults
            title="No consents found"
            description="Try adjusting the filters or creating a new consent."
          />
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


