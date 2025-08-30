"use client";
import CheckboxField from '@/components/CheckboxField';
import FormField from '@/components/FormField';
import TextAreaField from '@/components/TextAreaField';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sendSupportRequest } from '../../services/SupportService';


const SupportForm = () => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();

    const onSubmit = async (data) => {
        const { fullName, email, subject, message } = data;

        try {
            await sendSupportRequest({
                fullName,
                email,
                subject,
                message,
            });
            reset();

            toast.success('Message sent successfully! Please be patient.');
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <form
            className="md:col-span-3 col-span-full bg-c-black-06 border border-c-black-15 rounded-lg xl:px-8 px-5 xl:py-7 py-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className="md:grid md:grid-cols-2 3xl:gap-x-8 xl:gap-x-6 gap-x-4 3xl:gap-y-7 lg:gap-y-4 gap-y-2 max-md:space-y-3"
            >
                <FormField
                    label="Full Name"
                    id="full-name"
                    type="text"
                    placeholder="Enter your full name"
                    register={register}
                    validation={{
                        required: {
                            value: true,
                            message: 'Full Name is required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Full name must be at least 6 characters'
                        },
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Full name cannot contain numbers'
                        }
                    }}
                    errors={errors}
                />

                <FormField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    register={register}
                    validation={{
                        required: {
                            value: true,
                            message: 'Email is required'
                        },
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                        }
                    }}
                    errors={errors}
                />
                <div className="md:col-span-2">
                    <FormField
                        label='Subject'
                        id='subject'
                        type="text"
                        placeholder="Enter the subject of your message"
                        register={register}
                        validation={{
                            required: {
                                value: true,
                                message: 'Question is required'
                            },
                            minLength: {
                                value: 3,
                                message: 'Question must be at least 3 characters'
                            }
                        }}
                        errors={errors}
                    />
                </div>

                <TextAreaField
                    label="Message"
                    id="message"
                    rows={5}
                    placeholder="Enter your Message"
                    register={register}
                    validation={{
                        required: {
                            value: true,
                            message: 'Question is required'
                        },
                        minLength: {
                            value: 3,
                            message: 'Question must be at least 3 characters'
                        }
                    }}
                    errors={errors}
                />

            </div>
            <div className="flex lg:flex-row flex-col lg:items-start max-lg:gap-4 justify-between mt-5">

                <CheckboxField
                    label="I agree with Terms of Use and Privacy Policy"
                    id="agree-policy"
                    register={register}
                    validation={{
                        required: {
                            value: true,
                            message: 'You must agree to the terms of use and privacy policy'
                        }
                    }}
                    errors={errors}
                />
                <button
                    className="bg-c-red-45 text-white py-2 px-4 rounded 3xl:text-lg text-super-sm"
                    type="submit"
                >Send Message</button>
            </div>
        </form>
    )
};

export default SupportForm;