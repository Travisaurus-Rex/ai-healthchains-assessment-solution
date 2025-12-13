import React, { useState, useEffect, useCallback } from 'react';
import './TransactionHistory.css';
import { apiService } from '../../services/apiService';
import ErrorState from '../_shared/ErrorState/ErrorState';
import TransactionList from './components/TransactionList';

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await apiService.getTransactions(account);

        setTransactions(
          Array.isArray(data.transactions) ? data.transactions : []
        );
      } catch (err) {
        setError(err.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    });

  useEffect(() => {
    fetchTransactions();
  }, [account, fetchTransactions]);


  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '—';

    return new Date(timestamp).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  if (loading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-history-container">
        <ErrorState
          title="Failed to load transactions"
          message={error}
          onRetry={fetchTransactions}
        />
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter">
            Filtering for: {formatAddress(account)}
          </div>
        )}
      </div>

      <div className="transactions-list">
        <TransactionList
          transactions={transactions}
          formatAddress={formatAddress}
          formatDate={formatDate}
        />
      </div>

    </div>
  );
};

export default TransactionHistory;


