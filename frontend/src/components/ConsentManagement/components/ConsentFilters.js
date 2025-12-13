const ConsentFilters = ({ filterStatus, onChange }) => {
  return (
    <div className="consent-filters">
      <button
        className={filterStatus === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>

      <button
        className={filterStatus === 'active' ? 'active' : ''}
        onClick={() => onChange('active')}
      >
        Active
      </button>

      <button
        className={filterStatus === 'pending' ? 'active' : ''}
        onClick={() => onChange('pending')}
      >
        Pending
      </button>
    </div>
  );
};

export default ConsentFilters;
