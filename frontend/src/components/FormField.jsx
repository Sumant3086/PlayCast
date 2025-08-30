import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ id, label, placeholder, register, validation, errors, type = 'text' }) => {
    return (
        <div>
            <label htmlFor={id} className="text-white 3xl:text-xl lg:text-super-sm md:text-sm mb-2 xl:mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`support-input-field bg-c-black-10`}
                placeholder={placeholder}
                {...register(id, validation)}
            />
            {errors[id] && (
                <span className="text-c-red-50 block text-sm mt-1.5">{errors[id].message}</span>
            )}
        </div>
    );
};

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    validation: PropTypes.object,
    errors: PropTypes.object.isRequired,
    type: PropTypes.string,
};

export default FormField;
