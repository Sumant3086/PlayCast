import SubscriptionPlanToggle from "./SubscriptionPlanToggle";

const SubscriptionPlanTitle = ({ time, handleClick }) => {

    return (
        <div className="flex md:flex-row flex-col md:items-end items-start md:gap-6 gap-3.5">
            <div className="flex-1">
                <h3
                    className="text-white font-medium 3xl:text-3xl xl:text-2.5xl md:text-2xl text-xl md:mb-3 mb-1.5"
                >Choose the plan that is right for you</h3>
                <p
                    className="text-c-grey-60 3xl:text-xl lg:text-sm text-super-xs"
                >
                    Join PlayCast and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
                </p>
            </div>
            <SubscriptionPlanToggle time={time} handleClick={handleClick} />
        </div>
    );
}

export default SubscriptionPlanTitle;