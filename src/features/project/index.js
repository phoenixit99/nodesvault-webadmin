import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal, closeModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./projectSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import { getAllProduct } from '../../services/projectService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import necessary hooks


const TopSideButtons = () => {

    const dispatch = useDispatch();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchProjects = async () => {
        setLoading(true); // Set loading state
        try {
            const data = await getAllProduct(); // Call your API function
            setProjects(data); // Update the state with the fetched projects
        } catch (error) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const closeModal = () => {
        dispatch(closeModal()); // Replace with your actual action to close the modal
        fetchProjects(); // Call the fetch function to refresh the project list
    };

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Project", bodyType: MODAL_BODY_TYPES.PRODUCT_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}

function Leads() {

    const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate for navigation

    const fetchProjects = async () => {
        setLoading(true); // Set loading state
        try {
            const data = await getAllProduct(); // Call your API function
            setProjects(data); // Update the state with the fetched projects
        } catch (error) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchProjects(); // Fetch projects on component mount
    }, []);

    const openDurationModal = (productId) => {
        dispatch(openModal({
            title: "Add duration Project",
            bodyType: MODAL_BODY_TYPES.PRODUCT_ADD_DURATION,
            payload: productId
        }))
    }

    const viewDurationModal = (productId) => {
        dispatch(openModal({
            title: "View duration Project",
            bodyType: MODAL_BODY_TYPES.PRODUCT_VIEW_DURATION,
            payload: productId
        }))
    }
    const editProject = (product) => {
        dispatch(openModal({
            title: "View  Project",
            bodyType: MODAL_BODY_TYPES.PRODUCT_UPDATE_NEW,
            payload: product
        }))
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>

            <TitleCard title="List projects" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Logo Project</th>
                                <th>Name</th>
                                <th>Base Price</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={`https://webadmin-api.nodesvault.com/${l.image_url}`} alt="Avatar" />                                                </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.name}</td>
                                            <td>{l.base_price}$</td>
                                            <td>{l.description}</td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => openDurationModal(l.product_id)}><PlusIcon className="w-5" /></button></td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => viewDurationModal(l.product_id)}>Price</button></td>
                                            <td><button className="btn btn-square btn-ghost" onClick={() => editProject(l)}>Edit</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Leads