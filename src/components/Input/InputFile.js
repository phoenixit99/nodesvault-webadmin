import React from 'react';

const InputFile = ({ labelTitle, onChange, containerStyle }) => {
    return (
        <div className={containerStyle}>
            <label className="label">
                <span className="label-text">{labelTitle}</span>
            </label>
            <input
                type="file"
                onChange={onChange}
                className="input input-bordered w-full"
                accept="image/*" // Accept only image files
            />
        </div>
    );
};

export default InputFile;