import SubscriptionBox from "@/components/subscription/SubscriptionBox";
import SubscriptionPlan from "@/components/subscription/SubscriptionPlan";

const SubscriptionsPage = () => {
    return (
        <main className="">

            <SubscriptionPlan />

            <section className="container py-0">
                <div>
                    <h3 className="text-white font-medium xl:text-2.5xl md:text-2xl text-lg mb-3">Compare our plans and find the right one for you</h3>
                    <p className="text-c-grey-60 lg:text-sm md:text-super-xs text-xs">
                        PlayCast offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that is right for you.
                    </p>
                </div>
            </section>

            <SubscriptionBox />

        </main>
    );
}

export default SubscriptionsPage;