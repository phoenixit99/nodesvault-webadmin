import axios from '../config/axiosConfig';


// Create a new subscription duration
export const createDuration = async (projectData) => {

    try {
        const curlCommand = `curl -X POST 'https://webadmin-api.nodesvault.com/api/durations' -H 'Content-Type: application/json' -d '${JSON.stringify(projectData)}'`;
        console.log('cURL Command:', curlCommand); // Print the cURL 
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

export const updateDuration = async (durationData) => {
    try {
        const response = await axios.put(`/api/durations/${durationData.duration_id}`, durationData); // Assuming the product has an id
        return response.data;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};


export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error('getProductById creation failed',error);
    }
};

export const updateProduct = async (productData) => {
    try {
        const response = await axios.put(`/api/products/${productData.product_id}`, productData); // Assuming the product has an id
        return response.data;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};