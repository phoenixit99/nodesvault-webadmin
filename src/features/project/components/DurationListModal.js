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
            <ul>
                {durations.map((duration) => (
    <li key={duration.id} style={{ padding: '10px 0' }}> {/* Set padding top and bottom */}
                        {duration.duration_months} months - {duration.base_price}$
                    </li>
                ))}
            </ul>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default DurationListModal;