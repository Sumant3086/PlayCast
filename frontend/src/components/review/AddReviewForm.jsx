import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Rating from "react-rating";

import { OutlineStarIcon, StarIcon } from "@/assets/Svgs";
import TextAreaField from "../TextAreaField";
import { addNewReview } from "../../services/ReviewService";


const AddReviewForm = ({ mediaId, user, setIsOpen }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(1);

    const onSubmit = async (data) => {
        const { text } = data;
        try {
            await addNewReview({
                fullName: user.fullName,
                email: user.email,
                text,
                rating,
                media: mediaId
            });
            reset();

            toast.success('Review added successfully!');
            setIsOpen(false);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextAreaField
                label="Review Text"
                id="text"
                placeholder="Write your review here"
                register={register}
                validation={{
                    required: {
                        value: true,
                        message: 'Review is required'
                    },
                    minLength: {
                        value: 3,
                        message: 'Review must be at least 3 characters'
                    }
                }}
                errors={errors}
            />

            <Rating
                initialRating={rating}
                onChange={(rate) => setRating(rate)}
                emptySymbol={<OutlineStarIcon className="xl:w-6 xl:h-6 w-5 h-5 mr-3" />}
                fullSymbol={<StarIcon className="xl:w-6 xl:h-6 w-5 h-5 mr-3" />}
                className="md:mt-4 mt-2"
            />

            <button
                className="bg-c-red-45 text-white py-2 px-4 rounded 3xl:text-lg text-super-sm block md:mt-14 mt-10"
                type="submit"
            >
                Submit Review
            </button>

        </form>
    );
}

export default AddReviewForm;