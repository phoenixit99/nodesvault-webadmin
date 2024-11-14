import React, { useState } from 'react';
import InputText from '../../../components/Input/InputText'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateProduct } from "../../../services/projectService";
import { showNotification } from '../../common/headerSlice'; // Import notification action

const EditProductModal = ({ closeModal, product }) => {
    const [productData, setProductData] = useState(product);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = ({ updateType, value }) => {
        setProductData((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value };
            return updatedProductObj;
        });
    };

    const updateFormValueDescription = (updateType, value) => {
        setErrorMessage(''); // Clear any previous error messages
        setProductData((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value }; // Update the specific field
            return updatedProductObj; // Return the updated object
        });
    };

    const handleSave = async () => {
        try {
            const updatedProduct = await updateProduct(productData);
            showNotification({ message: 'Product updated successfully!', status: 1 });
            
            closeModal(); // Close the modal after successful update
        } catch (error) {
            console.error('Failed to update product:', error);
            setErrorMessage('Failed to update product. Please try again.'); // Set an error message to display
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <div>
                <InputText
                    type="text"
                    defaultValue={productData.name}

                    updateType="name"
                    containerStyle="mt-4"
                    labelTitle="Product Name"
                    updateFormValue={handleChange}
                />
            </div>
            <div className="mt-4">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <ReactQuill
                    placeholder="Enter product description"
                    defaultValue={productData.description}
                    onChange={(value) => {
                        updateFormValueDescription('description', value)
                    }} // Update the description on change

                    theme="snow"
                    style={{ height: '150px', paddingBottom: '20px' }} // Set height to 200px
                />
            </div>


            <InputText
                type="number"
                value={productData.base_price}
                defaultValue={productData.base_price}
                updateType="base_price"
                containerStyle="mt-4"
                labelTitle="Base Price"
                updateFormValue={handleChange}
            />

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditProductModal;