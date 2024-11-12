import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import InputFile from '../../../components/Input/InputFile.js'; // Assuming you have an InputFile component
import { showNotification } from "../../common/headerSlice"
import { createDuration } from "../../../services/projectService"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const INITIAL_PRODUCT_OBJ = {
    duration_months: '',
    base_price: '',
    description: '',
}

function AddDurationModal({ productId, closeModal}){
    
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);

    const saveNewProduct = async () => {
        if (!productObj.duration_months) {
            console.log('Duration is required.');
        }
        if (!productObj.base_price) {
            console.log('Base price is required.');
        }
        if (!productObj.duration_months || !productObj.base_price) {
            return setErrorMessage('Duration months and price are required!');
        }
        // Prepare the payload
        const payload = {
            product_id: productId,
            duration_months: parseInt(productObj.duration_months, 1), // Ensure it's a number
            description: productObj.description,
            base_price: parseFloat(productObj.base_price, 1)
        };
        try {
            console.log(payload);
            await createDuration(payload); // Call your service function to create the duration
            showNotification({ message: 'Duration added successfully!', status: 1 });
            closeModal(); // Close the modal after successful creation
        } catch (error) {
            setErrorMessage('Failed to add duration. Please try again.');
        }
    };

    const updateFormValue = ({updateType, value}) => {
        setProductObj((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value };
            return updatedProductObj;
        });
    };

    const updateFormValueDescription = (updateType, value) => {
        setErrorMessage(''); // Clear any previous error messages
        setProductObj((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value }; // Update the specific field
            return updatedProductObj; // Return the updated object
        });
    };

    return(
        <>

<InputText
                type="text"
                defaultValue={productObj.duration_months}
                updateType="duration_months"
                containerStyle="mt-4"
                labelTitle="Duration title"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                defaultValue={productObj.base_price}
                updateType="base_price"
                containerStyle="mt-4"
                labelTitle="Duration Price"
                updateFormValue={updateFormValue}
            />
              <div className="mt-4">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <ReactQuill
                    defaultValue={productObj.description}
                    onChange={(value) => {
                        updateFormValueDescription('description', value)
                    }} // Update the description on change
                    placeholder="Enter product description"
                    theme="snow"
                    style={{ height: '150px' , paddingBottom: '20px' }} // Set height to 200px
                />
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewProduct()}>Save</button>
            </div>
        </>
    )
}

export default AddDurationModal