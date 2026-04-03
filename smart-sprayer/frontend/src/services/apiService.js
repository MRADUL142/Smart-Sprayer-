import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiService = {
  async detectDisease(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/detect-disease`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async getPesticides() {
    const response = await axios.get(`${API_BASE_URL}/pesticides`);
    return response.data;
  },

  async getPesticideById(id) {
    const response = await axios.get(`${API_BASE_URL}/pesticides/${id}`);
    return response.data;
  },
};

export default apiService;
