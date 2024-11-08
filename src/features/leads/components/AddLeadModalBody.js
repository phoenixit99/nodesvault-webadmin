import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { createProject } from "../../../services/projectService"
const INITIAL_LEAD_OBJ = {
    name: "",
    avatar: "",
    apy: "",
    services: "",
    explorer: "",
    content: "",
    type: "",
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = async () => {
        if(leadObj.name.trim() === "")return setErrorMessage("Project Name is required!")
        else if(leadObj.content.trim() === "")return setErrorMessage("Content id is required!")
        else{
            setLoading(true);
            try {
                const payload = {
                    name: leadObj.name,
                    avatar: leadObj.avatar,
                    apy: leadObj.apy,
                    services: leadObj.services,
                    explorer: leadObj.explorer,
                    content: leadObj.content,
                    type: leadObj.type,
                };

                const data = await createProject(payload);
                dispatch(showNotification({ message: "New Project Created!", status: 1 }));
                closeModal();
            } catch (error) {
                setErrorMessage("Project creation failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.avatar} updateType="avatar" containerStyle="mt-4" labelTitle="Avatar URL" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.apy} updateType="apy" containerStyle="mt-4" labelTitle="APY" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.services} updateType="services" containerStyle="mt-4" labelTitle="Services" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.explorer} updateType="explorer" containerStyle="mt-4" labelTitle="Explorer" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.content} updateType="content" containerStyle="mt-4" labelTitle="Content" updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody