import { useState } from 'react';

const MAX_LENGTH = 280;

const PatientRecordCard = ({ record }) => {
  const [expanded, setExpanded] = useState(false);

  const description = record.description || '';
  const isLong = description.length > MAX_LENGTH;

  const visibleText =
    !isLong || expanded
      ? description
      : description.slice(0, MAX_LENGTH) + '…';

  return (
    <div className="record-card">
      <div className="record-header">
        <div className="record-title">{record.title}</div>
        <span className={`record-type ${record.type}`}>
          {record.type}
        </span>
      </div>

        <div className="record-description">
            {visibleText}
            {isLong && (
                <span
                className="record-toggle"
                onClick={() => setExpanded(!expanded)}
                >
                {expanded ? ' Show less' : ' Read more'}
                </span>
            )}
        </div>

      <div className="record-meta">
        <div className="record-meta-item">
          <strong>Date:</strong>{' '}
          {new Date(record.date).toLocaleDateString()}
        </div>

        <div className="record-meta-item">
          <strong>Doctor:</strong> {record.doctor}
        </div>

        <div className="record-meta-item">
          <strong>Hospital:</strong> {record.hospital}
        </div>

        <span className={`record-status ${record.status}`}>
          {record.status}
        </span>
      </div>
    </div>
  );
};

export default PatientRecordCard;
