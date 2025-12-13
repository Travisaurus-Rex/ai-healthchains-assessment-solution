const ConsentCard = ({ consent, onActivate }) => {
    return (
        <div className="consent-card">
            <div className={`consent-status-banner ${consent.status}`}>
            {consent.status}
            </div>

            <div className="consent-body">
            <div className="consent-row">
                <span className="consent-label">Patient ID</span>
                <span className="consent-value">{consent.patientId}</span>
            </div>

            <div className="consent-row">
                <span className="consent-label">Purpose</span>
                <span className="consent-value">{consent.purpose}</span>
            </div>

            <div className="consent-row">
                <span className="consent-label">Created</span>
                <span className="consent-value">
                {consent.createdAt
                    ? new Date(consent.createdAt).toLocaleString()
                    : '—'}
                </span>
            </div>

            <div className="consent-row">
                <span className="consent-label">Transaction</span>
                <span className="consent-value">
                {consent.blockchainTxHash
                    ? `${consent.blockchainTxHash.slice(0, 10)}…`
                    : '—'}
                </span>
            </div>

            {consent.status === 'pending' && (
                <button
                className="activate-btn"
                onClick={onActivate}
                >
                Activate
                </button>
            )}
            </div>
        </div>
    )
}

export default ConsentCard;