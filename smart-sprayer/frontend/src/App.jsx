import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ControlPanel from './components/ui/ControlPanel';
import ImageUpload from './components/ui/ImageUpload';
import ResultsPanel from './components/ui/ResultsPanel';
import './App.css';

function App() {
  const [diseaseData, setDiseaseData] = useState(null);
  const [pesticides, setPesticides] = useState([]);

  const containerStyle = {
    backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/background-image.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div className="app-container" style={containerStyle}>
      <Toaster position="top-right" />
      
      {/* Floating Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Smart Sprayer</h1>
          <p>Interactive AI-Powered Plant Disease Detection</p>
        </div>
      </header>

      {/* Floating Control Panels */}
      <div className="floating-panels">
        <div className="panel upload-panel">
          <ImageUpload 
            onDiseaseDetected={setDiseaseData}
            onPesticidesReceived={setPesticides}
          />
        </div>

        <div className="panel control-panel">
          <ControlPanel 
            diseaseData={diseaseData}
          />
        </div>

        <div className="panel results-panel">
          <ResultsPanel 
            pesticides={pesticides}
            diseaseData={diseaseData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
