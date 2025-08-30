const SinglePageSkeleton = () => {
    return (
        <main className="container py-6">
            <div className="relative w-full xl:h-[80vh] md:h-[60vh] h-[50vh]">
                {/* Skeleton for the image */}
                <div className="w-full h-full bg-c-black-20 animate-pulse rounded-xl"></div>

                <div className="w-full absolute bottom-0 md:mb-10 mb-8 text-center md:px-20 px-4">
                    {/* Skeleton for the title */}
                    <div className="bg-c-black-20 animate-pulse rounded w-3/4 h-8 mx-auto mb-4"></div>
                    {/* Skeleton for the description */}
                    <div className="bg-c-black-15 animate-pulse rounded w-1/2 h-4 mx-auto mb-6"></div>

                    {/* Skeleton for buttons */}
                    <div className="flex md:flex-row flex-col items-center justify-center gap-3.5">
                        <button
                            className="bg-c-black-15 animate-pulse text-transparent font-medium xl:h-12 h-11 px-6 flex items-center gap-1.5 rounded-md border-0 outline-none max-md:mt-3"
                        />
                        <div className="flex items-center gap-2.5">
                            <button
                                className="bg-c-black-15 animate-pulse xl:h-12 h-11 xl:w-12 w-11 rounded-md flex items-center justify-center"
                            />
                            <button
                                className="bg-c-black-15 animate-pulse xl:h-12 h-11 xl:w-12 w-11 rounded-md flex items-center justify-center"
                            />
                            <button
                                className="bg-c-black-15 animate-pulse xl:h-12 h-11 xl:w-12 w-11 rounded-md flex items-center justify-center"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-12 xl:gap-8 lg:gap-4 gap-6 xl:mt-24 md:mt-16 mt-10 mb-12 min-h-screen">
                <article className="lg:col-span-8 col-span-12 space-y-6 max-lg:order-2">

                    <div className="bg-c-black-10 border border-c-black-15 rounded-2xl flex flex-col gap-4 xl:py-7 xl:px-7 md:px-5 md:py-5 px-3.5 py-3.5">
                        <div className="bg-c-black-20 animate-pulse rounded w-3/4 h-6 mb-4"></div>
                        <div className="flex flex-col gap-4">
                            {/* Skeleton for season and episode list */}
                            <div className="bg-c-black-06 border border-c-black-15 rounded-xl xl:px-7 px-5 py-1">
                                <div className="flex items-center justify-between py-3.5 border-b border-b-c-black-15">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-c-black-20 animate-pulse rounded w-1/2 h-5"></div>
                                        <div className="bg-c-black-20 animate-pulse rounded w-1/4 h-4"></div>
                                    </div>
                                    <button className="bg-c-black-20 animate-pulse border border-c-black-15 rounded-full w-10 h-10 flex justify-center items-center">
                                        <div className="bg-c-black-15 w-[18px] h-[18px] rounded-full"></div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-c-black-10 border border-c-black-15 rounded-2xl h-40 flex flex-col gap-4 xl:py-7 xl:px-7 md:px-5 md:py-5 px-3.5 py-3.5" >
                        <div className="bg-c-black-20 animate-pulse rounded w-3/4 h-6 mb-4"></div>

                    </div>
                    <div className="bg-c-black-10 border border-c-black-15 rounded-2xl h-40 flex flex-col gap-4 xl:py-7 xl:px-7 md:px-5 md:py-5 px-3.5 py-3.5" >
                        <div className="bg-c-black-20 animate-pulse rounded w-3/4 h-6 mb-4"></div>

                    </div>

                </article>

                {/* Sidebar Skeleton */}
                <article className="lg:col-span-4 col-span-12 bg-c-black-10 border border-c-black-15 rounded-2xl xl:py-7 xl:px-7 md:px-5 md:py-5 px-3.5 py-3.5 lg:space-y-7 space-y-5 h-[700px]">
                    <div className="bg-c-black-20 animate-pulse rounded w-full h-6 mb-4"></div>
                    <div className="bg-c-black-20 animate-pulse rounded w-full h-6 mb-4"></div>
                </article>
            </section>
        </main>
    );
}

export default SinglePageSkeleton;