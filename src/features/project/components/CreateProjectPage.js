import React, { useState } from 'react';
import InputText from '../../../components/Input/InputText';
import InputFile from '../../../components/Input/InputFile.js';
import { createProduct } from '../../../services/projectService';
import { showNotification } from '../../common/headerSlice';

const INITIAL_PRODUCT_OBJ = {
    name: '',
    description: '',
    base_price: '',
    image: null,
};

const AddProductModalBody = ({ closeModal }) => {
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);
    const [errorMessage, setErrorMessage] = useState('');

    const updateFormValue = (updateType, value) => {
        setErrorMessage('');
        setProductObj({ ...productObj, [updateType]: value });
    };

    const handleFileChange = (event) => {
        setProductObj({ ...productObj, image: event.target.files[0] });
    };

    const saveNewProduct = async () => {
        if (!productObj.name || !productObj.description || !productObj.base_price || !productObj.image) {
            return setErrorMessage('All fields are required!');
        }

        try {
            const formData = new FormData();
            formData.append('name', productObj.name);
            formData.append('description', productObj.description);
            formData.append('base_price', productObj.base_price);
            formData.append('image', productObj.image);

            await createProduct(formData);
            showNotification({ message: 'Product created successfully!', status: 1 });
            closeModal(); // Close the modal after successful creation
        } catch (error) {
            setErrorMessage('Failed to create product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <InputText
                type="text"
                value={productObj.name}
                updateType="name"
                containerStyle="mt-4"
                labelTitle="Product Name"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                value={productObj.description}
                updateType="description"
                containerStyle="mt-4"
                labelTitle="Description"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="number"
                value={productObj.base_price}
                updateType="base_price"
                containerStyle="mt-4"
                labelTitle="Base Price"
                updateFormValue={updateFormValue}
            />
            <InputFile
                labelTitle="Image File"
                onChange={handleFileChange}
                containerStyle="mt-4"
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={saveNewProduct}>Save</button>
            </div>
        </div>
    );
};

export default AddProductModalBody;