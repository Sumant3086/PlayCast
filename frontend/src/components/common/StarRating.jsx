import { HalfStarIcon, OutlineStarIcon, StarIcon } from "@/assets/Svgs";

const StarRating = ({ special, rating }) => {
    const filledStars = Array(Math.floor(rating)).fill('filled');
    const halfStar = rating % 1 !== 0 ? ['half'] : [];
    const emptyStars = Array(5 - Math.floor(rating) - halfStar.length).fill('empty');

    const safeRating = rating == null || isNaN(rating) ? 0 : parseFloat(rating);
    const formattedRating = Number.isInteger(safeRating) ? safeRating : parseFloat(safeRating.toFixed(1));

    return (
        <div className="flex items-center 3xl:gap-1 gap-0.5">
            {filledStars.map((_, index) => (
                <StarIcon key={index}
                    className={`3xl:w-5 3xl:h-5 ${special ? "w-5 h-5 md:h-3.5 md:w-3.5" : "w-3.5 h-3.5"} text-c-red-45`}
                />
            ))}
            {halfStar.map((_, index) => (
                <HalfStarIcon key={index}
                    className={`3xl:w-5 3xl:h-5 ${special ? "w-5 h-5 md:h-3.5 md:w-3.5" : "w-3.5 h-3.5"} text-c-red-45`}
                />
            ))}
            {emptyStars.map((_, index) => (
                <OutlineStarIcon key={index}
                    className={`3xl:w-5 3xl:h-5 ${special ? "w-5 h-5 md:h-3.5 md:w-3.5" : "w-3.5 h-3.5"} fill-c-grey-60`}
                />
            ))}
            <span className={special ? "text-c-grey-60 max-md:text-super-base font-medium" : "text-c-grey-60"}>{formattedRating}</span>
        </div>
    );
};

export default StarRating;