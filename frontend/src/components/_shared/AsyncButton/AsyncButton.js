/*
  This component exists to provide consistent UX for async actions
  such as form submissions and inline row actions, ensuring users
  receive immediate feedback and preventing duplicate interactions. 
  
  While simple, this pattern reflects how real applications handle 
  user feedback during network-bound operations.
*/


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
