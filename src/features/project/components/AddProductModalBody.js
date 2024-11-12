import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import InputFile from '../../../components/Input/InputFile.js'; // Assuming you have an InputFile component
import { showNotification } from "../../common/headerSlice"
import { createProduct } from "../../../services/projectService"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const INITIAL_PRODUCT_OBJ = {
    name: '',
    description: '',
    base_price: '',
    image: null,
}

function AddProductModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);


    const saveNewProduct = async () => {
        if (!productObj.name) {
            console.log('Product Name is required.');
        }
        if (!productObj.description) {
            console.log('Description is required.');
        }
        if (!productObj.base_price) {
            console.log('Base Price is required.');
        }
        if (!productObj.image) {
            console.log('Image File is required.');
        }
        if (!productObj.name || !productObj.description || !productObj.base_price || !productObj.image) {
            return setErrorMessage('All fields are required!');
        }

        try {
            const formData = new FormData();
            formData.append('name', productObj.name);
            formData.append('description', productObj.description);
            formData.append('base_price', productObj.base_price);
            formData.append('image', productObj.image);

            await createProduct(formData); // Call your service function to create the product
            showNotification({ message: 'Product created successfully!', status: 1 });
            closeModal(); // Close the modal after successful creation
        } catch (error) {
            setErrorMessage('Failed to create product. Please try again.');
        }
    };

        const handleFileChange = (event) => {
        setProductObj({ ...productObj, image: event.target.files[0] });
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
                defaultValue={productObj.name}

                updateType="name"
                containerStyle="mt-4"
                labelTitle="Product Name"
                updateFormValue={updateFormValue}
            />
              <div className="mt-4">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <ReactQuill
                    placeholder="Enter product description"
                    defaultValue={productObj.description}
                    onChange={(value) => {
                        updateFormValueDescription('description', value)
                    }} // Update the description on change

                    theme="snow"
                    style={{ height: '150px' , paddingBottom: '20px' }} // Set height to 200px
                />
            </div>
            
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

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewProduct()}>Save</button>
            </div>
        </>
    )
}

export default AddProductModalBody