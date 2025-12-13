import './ErrorState.css';

const ErrorState = ({ title, message, onRetry }) => {
  return (
    <div className="error-state">
      <h3 className="error-title">{title}</h3>

      {message && (
        <p className="error-description">{message}</p>
      )}

      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;



