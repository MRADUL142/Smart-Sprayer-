import React from 'react';
import './ResultsPanel.css';

const ResultsPanel = ({ pesticides, diseaseData }) => {
  if (!diseaseData) {
    return (
      <div className="results-panel empty">
        <h3>📊 Recommendations</h3>
        <p className="placeholder-text">Upload an image to see pesticide recommendations</p>
      </div>
    );
  }

  return (
    <div className="results-panel">
      <h3>📊 Recommended Pesticides</h3>
      
      <div className="results-content">
        {pesticides.length > 0 ? (
          <ul className="pesticide-list">
            {pesticides.slice(0, 5).map((pesticide) => (
              <li key={pesticide.id} className="pesticide-item">
                <div className="pesticide-header">
                  <strong>{pesticide.name}</strong>
                  <span className="pesticide-type">{pesticide.type}</span>
                </div>
                {pesticide.description && (
                  <p className="pesticide-description">{pesticide.description}</p>
                )}
                <div className="pesticide-details">
                  {pesticide.dosage && (
                    <span className="detail-tag">📏 {pesticide.dosage}</span>
                  )}
                  {pesticide.application_rate && (
                    <span className="detail-tag">🎯 {pesticide.application_rate}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-pesticides">No pesticides found for this disease</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
