import React, { useState } from 'react';
import Input from './Input';

const Form = () => {
    const [fields, setFields] = useState({ firstName: '', lastName: '', phone: '', email: '' });
    const [errors, setErrors] = useState({ firstName: [], lastName: [], phone: [], email: [] });

    const validate = (name, value) => {
        let fieldErrors = [];

        // Check if Empty
        if (!value.trim()) {
            const label = name.replace(/([A-Z])/g, ' $1').toLowerCase();
            fieldErrors.push(`${label.charAt(0).toUpperCase() + label.slice(1)} is required`);
        }

        // Phone Validation (Regex)
        if (name === 'phone') {
            const phoneRegex = /^\d{10}$/;
            if (value && !phoneRegex.test(value)) fieldErrors.push('Phone number is invalid');
        }

        // Email Validation (Regex)
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) fieldErrors.push('Email is invalid');
        }

        return fieldErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            backgroundColor: '#f7f8f9', 
            padding: '40px',
            minHeight: '100vh'
        }}>
            <Input label="First Name" name="firstName" value={fields.firstName} onChange={handleChange} errors={errors.firstName} />
            <Input label="Last Name" name="lastName" value={fields.lastName} onChange={handleChange} errors={errors.lastName} />
            <Input label="Phone" name="phone" value={fields.phone} onChange={handleChange} errors={errors.phone} />
            <Input label="Email" name="email" value={fields.email} onChange={handleChange} errors={errors.email} />
        </div>
    );
};

export default Form;
