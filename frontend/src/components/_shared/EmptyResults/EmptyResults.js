
import './EmptyResults.css';

const EmptyResults = ({ title, description }) => {
  return (
    <div className="empty-results">
      <div className="empty-results-content">
        <div className="empty-results-title">{title}</div>
        {description && (
          <div className="empty-results-description">{description}</div>
        )}
      </div>
    </div>
  );
};

export default EmptyResults;
