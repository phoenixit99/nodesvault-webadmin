import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import necessary hooks
import { getProductById, updateProduct } from '../../../services/projectService'; // Import your service functions
import { showNotification } from '../../common/headerSlice'; // Import notification action

const EditProductPage = () => {
    const navigate = useNavigate(); // Use useNavigate for navigation
    const { productId } = useParams(); // Get productId from URL parameters
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        base_price: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(productId); // Fetch product data by ID
                setProductData(product);
            } catch (error) {
                setErrorMessage('Failed to fetch product data.');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value })); // Update product data
    };

    const handleSave = async () => {
        try {
            console.log('call api edit');
            await updateProduct(productData); // Call your update function
            showNotification({ message: 'Product updated successfully!', status: 1 });
            // history.push('/products'); // Redirect to the products list page after saving
        } catch (error) {
            setErrorMessage('Failed to update product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Base Price</label>
                <input
                    type="number"
                    name="base_price"
                    value={productData.base_price}
                    onChange={handleChange}
                />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => navigate('/products')}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    );
};

export default EditProductPage;