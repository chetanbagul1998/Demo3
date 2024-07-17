// src/services/projectService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust URL as per your Spring Boot app

const getAllProjects = () => {
    return axios.get(`${API_URL}/projects`);
};

const startProject = (projectId) => {
    return axios.put(`${API_URL}/projects/${projectId}/start`);
};

// Add functions for other CRUD operations (create, update, delete)

export default {
    getAllProjects,
    startProject
    // Export other functions as needed
};
