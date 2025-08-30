const SubscriptionPlanSkeleton = () => {
    return (
        <div className="flex flex-col justify-between bg-c-black-10 border border-c-black-15 px-6 py-5 rounded-lg animate-pulse">
            <>
                <div className="h-8 w-3/5 bg-c-black-20 rounded mb-2"></div>
                <div className="h-6 w-4/5 bg-c-black-15 rounded"></div>
                {/* <div className="h-3.5 w-4/5 bg-c-black-15 rounded"></div>
            <div className="h-3.5 mt-1 w-4/5 bg-c-black-15 rounded"></div> */}
            </>

            <div className="mt-6">
                <div className="h-8 w-1/2 bg-c-black-20 rounded mb-4"></div>

                <div className="flex items-center gap-4">
                    <div className="h-9 w-1/2 bg-c-black-15 rounded"></div>
                    <div className="h-9 w-1/2 bg-c-black-15 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlanSkeleton;