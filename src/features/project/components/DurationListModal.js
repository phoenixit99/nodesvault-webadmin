import React, { useEffect, useState } from 'react';
import { getDurationsByProductId } from "../../../services/projectService";

const DurationListModal = ({ closeModal, productId }) => {
    const [durations, setDurations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDurations = async () => {
            try {
                const data = await getDurationsByProductId(productId);
                setDurations(data);
            } catch (error) {
                setError('Failed to fetch durations');
            } finally {
                setLoading(false);
            }
        };

        fetchDurations();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Durations for Product ID: {productId}</h2>
            <ul>
                {durations.map((duration) => (
                    <li key={duration.id}>
                        {duration.duration_months} months - {duration.description}
                    </li>
                ))}
            </ul>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default DurationListModal;