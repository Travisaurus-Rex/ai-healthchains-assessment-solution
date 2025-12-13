import React, { useState, useEffect, useCallback } from 'react';
import './StatsDashboard.css';
import { apiService } from '../services/apiService';
import ErrorState from './_shared/ErrorState/ErrorState';
import Loader from './_shared/Loader/Loader';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const stats = await apiService.getStats();
      setStats(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <Loader />;

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <ErrorState 
          title="Error loading stats"
          message={error || 'No data available'}
          onRetry={fetchStats}
        />
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-label">Total Patients</div>
          <div className="stat-value">{stats.totalPatients}</div>
          <div className="stat-description">Registered patients on the platform</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">{stats.totalRecords}</div>
          <div className="stat-description">Medical records stored</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Consents</div>
          <div className="stat-value">{stats.totalConsents}</div>
          <div className="stat-description">All consent agreements</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Consents</div>
          <div className="stat-value">{stats.activeConsents}</div>
          <div className="stat-description">Currently active consents</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Pending Consents</div>
          <div className="stat-value">{stats.pendingConsents}</div>
          <div className="stat-description">Awaiting approval</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value">{stats.totalTransactions}</div>
          <div className="stat-description">Blockchain transactions recorded</div>
        </div>
      </div>

    </div>
  );
};

export default StatsDashboard;


