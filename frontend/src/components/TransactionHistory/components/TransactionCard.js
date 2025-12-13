const TransactionCard = ({ tx, formatAddress, formatDate }) => {
  return (
    <div className="transaction-card">
      <div className="transaction-header-info">
        <span className={`transaction-type ${tx.type}`}>
          {tx.type.replace('_', ' ')}
        </span>

        <span className={`transaction-status ${tx.status}`}>
          {tx.status}
        </span>
      </div>

      <div className="transaction-details">
        <div className="transaction-detail-item">
          <span className="transaction-detail-label">From</span>
          <span className="transaction-detail-value address">
            {formatAddress(tx.from)}
          </span>
        </div>

        <div className="transaction-detail-item">
          <span className="transaction-detail-label">To</span>
          <span className="transaction-detail-value address">
            {formatAddress(tx.to)}
          </span>
        </div>

        <div className="transaction-detail-item">
          <span className="transaction-detail-label">Amount</span>
          <span className="transaction-amount">
            {tx.amount} {tx.currency}
          </span>
        </div>

        <div className="transaction-detail-item">
          <span className="transaction-detail-label">Block</span>
          <span className="transaction-detail-value">
            {tx.blockNumber}
          </span>
        </div>
      </div>

      <div className="transaction-details">
        <div className="transaction-detail-item">
          <span className="transaction-detail-label">Transaction Hash</span>
          <span className="transaction-detail-value hash">
            {tx.blockchainTxHash}
          </span>
        </div>

        <div className="transaction-detail-item">
          <span className="transaction-detail-label">Timestamp</span>
          <span className="transaction-timestamp">
            {formatDate(tx.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
