import axios from '../config/axiosConfig';


// Create a new subscription duration
export const createDuration = async (projectData) => {

    try {
        const response = await axios.post('/api/durations', projectData);
        return response.data;
    } catch (error) {
        throw new Error('create duration creation failed',projectData);
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

export const getDurationsByProductId = async (productId) => {
    try {
        const response = await axios.get(`/api/durations/product/${productId}`);
        return response.data; // Assuming the API returns an array of durations
    } catch (error) {
        throw new Error('Failed to fetch durations');
    }
};