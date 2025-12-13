const ConsentErrorState = ({ error, onRetry }) => {
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
                onClick={onRetry}
                >
                Retry
                </button>
            </div>
        </div>
    )
}

export default ConsentErrorState;