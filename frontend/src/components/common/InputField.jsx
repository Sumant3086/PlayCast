// import PropTypes from 'prop-types';
// import React from 'react';

// // const InputField = React.memo(({ label, placeholder, type = "text", value, onChange, name, textarea = false, customClass }) => {
// const InputField = React.memo(({ label, placeholder, type = "text", name, textarea = false, customClass, validationRules }) => {
//     return (
//         <div className={textarea ? "col-span-full" : ""}>
//             <label htmlFor={name} className="text-white lg:text-super-sm md:text-sm">{label}</label>
//             {textarea ? (
//                 <textarea
//                     type={type}
//                     className={`support-input-field ${customClass}`}
//                     rows={5}
//                     placeholder={placeholder}
//                     value={value}
//                     onChange={onChange}
//                 />
//             ) : (
//                 <input
//                     type={type}
//                     id={name}
//                     name={name}
//                     className={`support-input-field ${customClass}`}
//                     placeholder={placeholder}
//                     // value={value}
//                     // onChange={onChange}
//                     {...validationRules}
//                 />
//             )}
//         </div>
//     );
// });

// InputField.propTypes = {
//     label: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     type: PropTypes.string,
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     textarea: PropTypes.bool,
//     customClass: PropTypes.string
// };

// export default InputField;




// // const InputField = ({ label, type, id, placeholder, handleRegister, validationRules }) => {
// //     // console.log(register)
// //     return (
// //         <div>
// //             <label htmlFor={id} className="text-white lg:text-super-sm md:text-sm">{label}</label>
// //             <input
// //                 type={type}
// //                 id={id}
// //                 className="support-input-field bg-c-black-10"
// //                 placeholder={placeholder}
// //             // {...handleRegister("text", { // Destructure and apply register with validation rules directly
// //             //     required: 'text is required',
// //             //     // pattern: {
// //             //     //     value: /^\S+@\S+$/,
// //             //     //     message: 'Invalid email address'
// //             //     // }
// //             // })}
// //             // {...register(id, validationRules)}
// //             // {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
// //             />
// //         </div>
// //     );
// // }

// // export default InputField;