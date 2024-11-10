import axios from '../config/axiosConfig';

export const createProject = async (projectData) => {
    try {
        const response = await axios.post('/api/projects', projectData);
        return response.data;
    } catch (error) {
        throw new Error('Project creation failed');
    }
};
export const getAllProjects = async (projectData) => {
    try {
        const response = await axios.get('/api/projects', projectData);
        return response.data;
    } catch (error) {
        throw new Error('Project creation failed');
    }
};
export const deleteProject = async (projectId) => {
    try {
        const response = await axios.delete(`/api/projects/${projectId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete project');
    }
};

export const createProduct = async (projectData) => {
    try {
        const response = await axios.post('/api/products', projectData);
        return response.data;
    } catch (error) {
        throw new Error('Project creation failed');
    }
};
export const getAllProduct = async (projectData) => {
    try {
        const response = await axios.get('/api/products', projectData);
        return response.data;
    } catch (error) {
        throw new Error('Project creation failed');
    }
};