const SearchMovieItemSkeleton = () => {
    return (

        <div
            className="w-full px-5 py-4 flex gap-6 bg-c-black-10/65 backdrop-blur-sm border-2 border-c-black-15 rounded-xl"
        >
            <div className="w-52 h-60 bg-c-black-15 animate-pulse rounded-xl border-2 border-c-black-15"></div>
            <div className="flex flex-col justify-between items-start flex-1 tracking-wide">
                <div className="w-full animate-pulse">
                    <div className="flex items-center justify-between mb-7">
                        <div className="h-6 w-32 bg-c-black-15 rounded-md"></div>
                        <div className="w-20 h-6 bg-c-black-15 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-c-black-15 rounded-md"></div>
                        <div className="h-4 w-5/6 bg-c-black-15 rounded-md"></div>
                        <div className="h-4 w-4/6 bg-c-black-15 rounded-md"></div>
                    </div>
                    <div className="flex gap-2 capitalize mt-3 text-c-grey-75/85 text-super-sm">
                        <div className="h-4 w-12 bg-c-black-15 rounded-md"></div>
                        <div className="h-4 w-12 bg-c-black-15 rounded-md"></div>
                        <div className="h-4 w-12 bg-c-black-15 rounded-md"></div>
                    </div>
                </div>
                <div className="w-40 h-8 bg-c-black-15 rounded-lg animate-pulse"></div>
            </div>
        </div>

    );
}

export default SearchMovieItemSkeleton;