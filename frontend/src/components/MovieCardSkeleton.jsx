const MovieCardSkeleton = ({ special }) => {
    return (
        <div
            className={`bg-c-black-10 border border-c-black-15 rounded-xl flex-shrink-0  ${special ? "max-md:w-full px-4 py-4" : "3xl:w-72 xl:w-60 md:w-52 w-44 px-2.5 py-2.5"} md:px-4 md:py-4`}
        >
            <div className="bg-c-black-20 animate-pulse rounded-xl w-full aspect-thumbnail"></div>

            <div className="mt-4 mb-3">
                <div className="bg-c-black-20 animate-pulse rounded w-3/4 h-5"></div>
            </div>

            <div className="flex justify-between max-md:flex-col text-c-grey-60 3xl:text-super-base text-sm mt-2">
                <div className="bg-c-black-15 animate-pulse rounded-full 3xl:py-1.5 py-0.5 3xl:px-3.5 px-[.38rem] flex items-center gap-0.5">
                    {/* <div className="w-[1.15rem] h-[1.15rem] bg-gray-400 rounded-full"></div> */}
                    <div className="bg-c-black-15 animate-pulse rounded w-14 h-3.5"></div>
                </div>
                <div className="bg-c-black-15 animate-pulse rounded-full 3xl:py-1.5 py-0.5 3xl:px-3.5 px-[.38rem] flex items-center gap-0.5">
                    {/* <div className="w-5 h-5 bg-gray-400 rounded-full"></div> */}
                    <div className="bg-c-black-15 animate-pulse rounded w-14 h-3.5"></div>
                </div>
            </div>

            <div className="flex justify-between gap-1 mt-3.5">
                <div className="bg-c-black-15 animate-pulse rounded 3xl:py-1.5 py-0.5 3xl:px-4 px-2 w-3/4 h-5"></div>
            </div>

            <div className="bg-c-black-15 w-full h-8 mt-5 rounded-lg animate-pulse"></div>
        </div>

    );
}

export default MovieCardSkeleton;