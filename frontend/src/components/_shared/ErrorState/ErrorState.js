import './ErrorState.css';

const ErrorState = ({ title, description, onRetry }) => {
  return (
    <div className="error-state">
      <h3 className="error-title">{title}</h3>

      {description && (
        <p className="error-description">{description}</p>
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



