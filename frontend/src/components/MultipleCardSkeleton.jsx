const MultipleCardSkeleton = () => {
    return (
        <div
            className="flex-shrink-0 3xl:w-72 md:w-60 w-44 max-sm:w-[11rem] lg:px-5 md:px-4 md:py-4
             p-3 bg-c-black-10 border border-c-black-15 rounded-xl relative animate-pulse"
        >
            <div className="space-y-1">
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-full bg-c-black-20 rounded-xl aspect-square"></div>
                    <div className="w-full bg-c-black-20 rounded-xl aspect-square"></div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-full bg-c-black-20 rounded-xl aspect-square"></div>
                    <div className="w-full bg-c-black-20 rounded-xl aspect-square"></div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-5">
                <div className="w-24 h-4 bg-c-black-15 rounded"></div>
            </div>
        </div>
    );
}

export default MultipleCardSkeleton;