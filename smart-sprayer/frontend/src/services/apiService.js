import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
});

const apiService = {
  async detectDisease(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log(`Uploading image to: ${API_BASE_URL}/detect-disease`);
      const response = await apiClient.post('/detect-disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Disease detection response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      if (error.message === 'Network Error') {
        throw new Error('Backend server not responding. Make sure the backend is running at ' + API_BASE_URL);
      }
      throw error;
    }
  },

  async getPesticides() {
    try {
      console.log(`Fetching pesticides from: ${API_BASE_URL}/pesticides`);
      const response = await apiClient.get('/pesticides');
      console.log('Pesticides response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  },

  async getPesticideById(id) {
    try {
      const response = await apiClient.get(`/pesticides/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  },
};

export default apiService;
