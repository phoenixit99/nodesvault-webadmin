import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { createProject } from "../../../services/projectService"
const INITIAL_PRODUCT_OBJ = {
    name: '',
    description: '',
    base_price: '',
    image: null,
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);

    const saveNewLead = async () => {
     
    }

    const updateFormValue = ({updateType, value}) => {
        // setErrorMessage("")
        // setLeadObj({...leadObj, [updateType] : value})

        console.log(updateType);
        console.log(value);
        setErrorMessage('');
        setProductObj((prev) => {
            const updatedProductObj = { ...prev, [updateType]: value };
            console.log('Updated productObj:', updatedProductObj); // Log the updated productObj
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

            {/* <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.avatar} updateType="avatar" containerStyle="mt-4" labelTitle="Avatar URL" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.apy} updateType="apy" containerStyle="mt-4" labelTitle="APY" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.services} updateType="services" containerStyle="mt-4" labelTitle="Services" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.explorer} updateType="explorer" containerStyle="mt-4" labelTitle="Explorer" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.content} updateType="content" containerStyle="mt-4" labelTitle="Content" updateFormValue={updateFormValue}/> */}


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody