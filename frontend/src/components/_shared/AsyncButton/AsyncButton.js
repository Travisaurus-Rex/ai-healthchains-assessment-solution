import './AsyncButton.css';

const AsyncButton = ({
  isLoading,
  children,
  loadingText = 'Working…',
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`async-button ${className}`}
    >
      {isLoading ? (
        <span className="async-button-content">
          <span className="spinner" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default AsyncButton;
