import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import InputFile from '../../../components/Input/InputFile.js'; // Assuming you have an InputFile component
import { showNotification } from "../../common/headerSlice"
import { createProduct } from "../../../services/projectService"

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

        setErrorMessage('');
        setProductObj((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value };
            return updatedProductObj;
        });
    }

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

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewProduct()}>Save</button>
            </div>
        </>
    )
}

export default AddProductModalBody