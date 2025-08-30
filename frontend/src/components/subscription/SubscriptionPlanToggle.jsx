const SubscriptionPlanToggle = ({ time, handleClick }) => {

    const handleClass = (prop) => {
        return `${time === prop ? "bg-c-black-12 text-white" : "text-c-grey-60"} 3xl:px-6 3xl:py-2.5 px-4 py-1.5 rounded-md 3xl:text-xl`
    }

    return (
        <div className="flex bg-c-black-06 bordre border-c-black-15 p-1.5 rounded-xl text-super-sm">
            <button
                className={handleClass("monthly")}
                onClick={() => handleClick("monthly")}
            >
                Monthly
            </button>
            <button
                className={handleClass("yearly")}
                onClick={() => handleClick("yearly")}
            >
                Yearly
            </button>
        </div>
    );
}

export default SubscriptionPlanToggle;