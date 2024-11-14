import React, { useState } from 'react';
import InputText from '../../../components/Input/InputText'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateDuration } from "../../../services/projectService";
import { showNotification } from '../../common/headerSlice'; // Import notification action

const EditDurationModal = ({ duration, closeModal }) => {
    const [updatedDuration, setUpdatedDuration] = useState(duration);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = ({ updateType, value }) => {
        setUpdatedDuration((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value };
            return updatedProductObj;
        });
    };

    const handleSubmit = async () => {
    
        try {
            const updatedProduct = await updateDuration(updatedDuration);
            showNotification({ message: 'Product updated successfully!', status: 1 });
            closeModal(); // Close the modal after successful update
        } catch (error) {
            console.error('Failed to update product:', error);
            setErrorMessage('Failed to update product. Please try again.'); // Set an error message to display
        }
    };

    return (
        <div className="edit-duration-modal">
            <h2>Edit Duration</h2>
            <div>
                <InputText
                    type="text"
                    defaultValue={updatedDuration.duration_months}
                    updateType="duration_months"
                    containerStyle="mt-4"
                    labelTitle="Month"
                    updateFormValue={handleChange}
                />
            </div>


            <div>
                <InputText
                    type="text"
                    defaultValue={updatedDuration.base_price}
                    updateType="base_price"
                    containerStyle="mt-4"
                    labelTitle="Base Price"
                    updateFormValue={handleChange}
                />
            </div>

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default EditDurationModal;