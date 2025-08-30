import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import FormField from "../FormField";
import TextAreaField from "../TextAreaField";
import useUserStore from "@/stores/useUserStore";
import { sendSupportRequest } from "../../services/SupportService";


const QuestionForm = () => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const user = useUserStore(state => state.user);

    const onSubmit = async (data) => {
        if (user) {
            const { subject, question } = data;
            try {
                await sendSupportRequest({
                    fullName: user?.fullName,
                    email: user?.email,
                    subject,
                    message: question,
                });
                reset();

                toast.success('Message sent successfully! Please be patient.');
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    label="Subject"
                    id="subject"
                    type="text"
                    placeholder="Enter the subject of your question"
                    register={register}
                    validation={{
                        required: {
                            value: true,
                            message: 'Subject is required'
                        },
                        minLength: {
                            value: 3,
                            message: 'Subject must be at least 3 characters'
                        }
                    }}
                    errors={errors}
                />
                <TextAreaField
                    label="Question"
                    id="question"
                    placeholder="Write your question here"
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
                <button
                    className="bg-c-red-45 text-white py-2 px-4 rounded 3xl:text-lg text-super-sm"
                    type="submit"
                >
                    Submit Question
                </button>

            </form>
        </div>
    );
}

export default QuestionForm;