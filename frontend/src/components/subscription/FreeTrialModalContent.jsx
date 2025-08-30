import { handleActivateSubscription } from "@/services/SubscriptionService";
import useUserStore from "@/stores/useUserStore";
import { toast } from "react-toastify";

const FreeTrialModalContent = ({ id, setIsOpen }) => {
    const fetchUser = useUserStore((state) => state.fetchUser);

    const handlePlan = async () => {
        try {
            const data = await handleActivateSubscription(id, true);
            setIsOpen(false);
            toast.success("Free trial activated successfully.");
            await fetchUser();
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again later.");
        }
    }

    return (
        <>
            <span className="block text-center text-xl font-bold text-white">
                Start your free trial
            </span>
            <p className="text-center text-c-grey-65 mt-2 text-super-sm tracking-wide">
                Are you sure you want to start the free trial? After activation, <br /> you will have 7 days of free access to the content.
            </p>

            <div className="flex justify-center gap-3.5 mt-9 text-white 3xl:text-lg text-super-sm">
                <button
                    className="bg-c-red-45 py-2 px-9 rounded"
                    onClick={handlePlan}
                >
                    Start Free Trial
                </button>
            </div>
        </>
    );
}

export default FreeTrialModalContent;