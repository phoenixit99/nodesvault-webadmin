import axios from '../config/axiosConfig';

export const login = async (loginObj) => {
    try {
        console.log('Attempting to log in with:', loginObj); // Log the login object
        const response = await axios.post('/api/login', loginObj);
        console.log('Login response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Login failed:', error); // Log the error
        throw new Error('Login failed');
    }
};

export const register = async (registerObj) => {
    try {
        console.log('Attempting to log in with:', registerObj); // Log the login object
        const response = await axios.post('/api/users/signup', registerObj);
        console.log('register response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};