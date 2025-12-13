import TransactionCard from './TransactionCard';
import EmptyResults from '../../_shared/EmptyResults/EmptyResults';

const TransactionList = ({ transactions, formatAddress, formatDate }) => {
  if (transactions.length === 0) {
    return (
      <EmptyResults title="No transactions found" />
    );
  }

  return (
    <>
      {transactions.map(tx => (
        <TransactionCard
          key={tx.id}
          tx={tx}
          formatAddress={formatAddress}
          formatDate={formatDate}
        />
      ))}
    </>
  );
};

export default TransactionList;
