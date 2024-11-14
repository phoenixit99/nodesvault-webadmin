import EditDurationModal from './EditDurationModal'; // Import the edit modal component
import React, { useEffect, useState } from 'react';
import { getDurationsByProductId } from "../../../services/projectService";

const DurationListModal = ({ closeModal, productId }) => {
    const [durations, setDurations] = useState([]); // Assume durations are fetched and set here
    const [editingDuration, setEditingDuration] = useState(null); // State to hold the duration being edited
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const fetchDurations = async () => {
        try {
            const data = await getDurationsByProductId(productId);
            setDurations(data);
        } catch (error) {
            setErrorMessage('Failed to fetch durations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDurations();
    }, [productId]);

    const handleEdit = (duration) => {
        setEditingDuration(duration); // Set the duration to be edited
    };

    return (
        <div>
            {editingDuration == null && (
                <>
                    <ul>
                        {durations.map((duration) => (
                            <li key={duration.id} style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '10px' }}>
                                    {duration.duration_months} months - {duration.base_price}$
                                </div>
                                <button onClick={() => handleEdit(duration)}>
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                    </div>
                </>
            )
            }

            {editingDuration && (
                <EditDurationModal
                    duration={editingDuration}
                    closeModal={() => closeModal()} // Close the edit modal
                    onSave={(updatedDuration) => {
                        closeModal()
                    }}
                />
            )}
        </div>
    );
};

export default DurationListModal;