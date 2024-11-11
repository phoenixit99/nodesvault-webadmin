import axios from '../config/axiosConfig';


// Create a new subscription duration
export const createDuration = async (projectData) => {

    try {
        const response = await axios.post('/api/durations', projectData);
        return response.data;
    } catch (error) {
        throw new Error('Project creation failed');
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