import React from 'react';

const Input = ({ label, name, value, onChange, errors }) => {
    return (
        <div style={{ marginBottom: '20px', textAlign: 'left', width: '300px' }}>
            <label style={{ display: 'block', color: '#4a5568', marginBottom: '5px' }}>{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    outline: 'none'
                }}
            />
            {/* Visual Error Handling based on Image */}
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
                {errors.map((error, index) => (
                    <div key={index} style={{ color: '#f56565', fontSize: '14px' }}>
                        {error}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Input;
