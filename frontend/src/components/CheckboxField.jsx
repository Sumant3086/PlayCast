// components/CheckboxField.js
import React from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ id, label, register, validation, errors }) => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={id}
                    className="accent-c-black-15 w-5 h-5"
                    {...register(id, validation)}
                />
                <label htmlFor={id} className="text-c-grey-60 3xl:text-base xl:text-sm text-super-xs">
                    {label}
                </label>
            </div>
            {errors[id] && (
                <span className="text-c-red-50 block mt-2 text-sm">{errors[id].message}</span>
            )}
        </div>
    );
};

CheckboxField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    validation: PropTypes.object,
    errors: PropTypes.object.isRequired,
};

export default CheckboxField;
