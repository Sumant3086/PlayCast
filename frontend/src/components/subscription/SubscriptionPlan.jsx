"use client";

import { useEffect, useState } from "react";
import SubscriptionPlanTitle from "./SubscriptionPlanTitle";

import useUserStore from "@/stores/useUserStore";
import SubscriptionPlanSkeleton from "./SubscriptionPlanSkeleton";
import SubscriptionPlanContent from "./SubscriptionPlanContent";


const SubscriptionPlan = () => {

    const user = useUserStore(state => state.user);
    const [time, setTime] = useState("monthly");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [time]);

    const handleClick = (newTime) => {
        setLoading(true);
        setTime(newTime);
    };

    return (
        <section className="container py-16">
            <SubscriptionPlanTitle time={time} handleClick={handleClick} />

            <div className="grid lg:grid-cols-3 md:grid-cols-2 3xl:gap-8 lg:gap-4 gap-5 md:mt-8 mt-10">

                {loading ?
                    Array.from({ length: 3 }).map((_, index) => <SubscriptionPlanSkeleton key={index} />) :
                    <SubscriptionPlanContent user={user} time={time} />
                }

            </div>

        </section>
    );
}

export default SubscriptionPlan;