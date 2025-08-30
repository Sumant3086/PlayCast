const SeasonItemSkeleton = () => {
    return (
        <div className="bg-c-black-06 border border-c-black-15 rounded-xl xl:px-7 px-5 py-1 animate-pulse">
            {/* Header Section */}
            <div className="flex items-center justify-between py-3.5 border-b border-b-c-black-15">
                <div className="flex items-center gap-4">
                    <div className="bg-c-black-15 h-6 w-32 rounded"></div>
                    <div className="bg-c-black-15 h-6 w-24 rounded"></div>
                </div>
                <button className="bg-c-black-10 border border-c-black-15 rounded-full w-10 h-10 flex justify-center items-center">
                </button>
            </div>

            {/* Episodes Section */}
            <div className="flex items-center lg:py-6 py-4 2xl:gap-6 gap-3 border-b border-b-c-black-15 last:border-b-0">
                <div className="bg-c-black-10 h-8 w-8 rounded-lg text-c-grey-60 font-semibold"></div>
                <div className="flex-1 flex 2xl:gap-4 md:gap-2.5 md:flex-row flex-col">
                    <div className="relative rounded-2xl overflow-hidden lg:w-52 md:w-56 border border-c-black-15 bg-c-black-20 h-32"></div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex xl:flex-row flex-col xl:items-center items-start max-xl:gap-3 max-md:gap-1.5 max-xl:mb-2 max-md:mb-0 justify-between">
                            <div className="bg-c-black-20 h-6 w-3/4 rounded"></div>
                            <div className="bg-c-black-15 h-6 w-20 rounded"></div>
                        </div>
                        <div className="bg-c-black-15 h-12 mt-2 w-full rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeasonItemSkeleton;