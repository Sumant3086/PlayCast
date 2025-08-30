import { handleActivateSubscription } from "@/services/SubscriptionService";
import useUserStore from "@/stores/useUserStore";
import { toast } from "react-toastify";

const SubscriptionModalContent = ({ id, plan, time, setIsOpen }) => {
    const fetchUser = useUserStore((state) => state.fetchUser);

    const handlePlan = async () => {
        const formatTime = time === "month" ? 31 : 365;
        try {
            const data = await handleActivateSubscription(id, false, formatTime, plan);
            setIsOpen(false);
            toast.success("Subscription activated successfully.");
            await fetchUser();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <span className="block text-center text-xl font-bold text-white">
                Start <span className="capitalize">{plan}</span> Plan - {time === "month" ? "1 Month" : "1 Year"}
            </span>
            <p className="text-center text-c-grey-65 mt-4 text-super-sm tracking-wide">
                Are you sure you want to choose this plan? You will be <br /> redirected to the payment page after selection.
            </p>

            <div className="flex justify-center gap-3.5 mt-9 text-white 3xl:text-lg text-super-sm">
                <button
                    className="bg-c-red-45 py-2 px-9 rounded"
                    onClick={handlePlan}
                >
                    Pay Now
                </button>
            </div>
        </>
    );
}

export default SubscriptionModalContent;