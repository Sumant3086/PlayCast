const ReviewItemSkeleton = () => {
    return (
        <div className="py-4 px-4 bg-c-black-06 border border-c-black-15 rounded-lg 3xl:basis-[450px] lg:basis-[377px] flex-shrink-0 flex-grow-0 basis-full animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="bg-c-black-20 h-6 w-32 rounded"></div>
                </div>
                <div className="rounded-full bg-c-black-10 h-8 w-24"></div>
            </div>
            <div className="mt-6 bg-c-black-20 h-16 w-full rounded"></div>
        </div>
    );
}

export default ReviewItemSkeleton;