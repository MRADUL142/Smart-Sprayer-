import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ diseaseData, onSprayToggle, onDiseaseSelect }) => {
  const [isSprayEnabled, setIsSprayEnabled] = React.useState(false);

  const handleSprayToggle = () => {
    const newState = !isSprayEnabled;
    setIsSprayEnabled(newState);
    onSprayToggle(newState);
  };

  return (
    <div className="control-panel">
      <h3>Controls</h3>
      
      <div className="control-group">
        <label>Spray Pesticide</label>
        <button
          className={`btn btn-spray ${isSprayEnabled ? 'active' : ''}`}
          onClick={handleSprayToggle}
          disabled={!diseaseData}
        >
          {isSprayEnabled ? '🔴 Stop Spraying' : '▶️ Start Spraying'}
        </button>
      </div>

      {diseaseData && (
        <div className="disease-info">
          <div className="disease-stat">
            <strong>Disease Confidence:</strong>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${diseaseData.confidence * 100}%` }}
              ></div>
            </div>
            <span className="confidence-value">
              {(diseaseData.confidence * 100).toFixed(1)}%
            </span>
          </div>

          <div className="disease-stat">
            <strong>Severity:</strong>
            <span className={`severity-tag severity-${Math.floor(diseaseData.disease_id / 33)}`}>
              {['Mild', 'Moderate', 'Severe'][Math.floor(diseaseData.disease_id / 33)]}
            </span>
          </div>
        </div>
      )}

      <div className="camera-info">
        <small>💡 Tip: Drag to rotate, Scroll to zoom</small>
      </div>
    </div>
  );
};

export default ControlPanel;
