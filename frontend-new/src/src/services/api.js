import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// 🔹 Authentication APIs
export const authApi = {
  signup: (data) => axios.post(`${API_BASE_URL}/auth/signup`, data),
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
};

// 🔹 Healthcare Schemes API
export const schemeApi = {
  matchSchemes: (data) => axios.post(`${API_BASE_URL}/schemes/match`, data),
};

// 🔹 Document Upload API
export const documentApi = {
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append("document", file);
    return axios.post(`${API_BASE_URL}/documents/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// 🔹 Hospital API
export const hospitalApi = {
  getNearbyHospitals: (latitude, longitude) =>
    axios.get(`${API_BASE_URL}/hospitals`, {
      params: { latitude, longitude },
    }),
};
