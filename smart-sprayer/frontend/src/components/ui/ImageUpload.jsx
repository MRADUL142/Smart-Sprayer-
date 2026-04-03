import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import apiService from '../../services/apiService';
import './ImageUpload.css';

const ImageUpload = ({ onDiseaseDetected, onPesticidesReceived }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload
    setIsLoading(true);
    try {
      console.log('Starting image upload:', file.name);
      const result = await apiService.detectDisease(file);
      console.log('Received result:', result);
      onDiseaseDetected(result);
      
      // Fetch pesticides
      const pesticides = await apiService.getPesticides();
      onPesticidesReceived(pesticides);
      
      toast.success('Disease detected! Check recommendations.');
    } catch (error) {
      console.error('Full error:', error);
      toast.error('❌ Error: ' + (error.message || error.toString()));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="image-upload">
      <h3>Upload Plant Image</h3>
      
      <div
        className="upload-area"
        onDrop={handleDragDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <div className="upload-placeholder">
            <p>📸 Drag & drop image here</p>
            <p>or click to browse</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <button
          className="btn-upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Select Image'}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
