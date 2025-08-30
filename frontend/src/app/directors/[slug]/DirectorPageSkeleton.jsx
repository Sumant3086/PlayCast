import MovieCardSkeleton from "@/components/MovieCardSkeleton";

const DirectorPageSkeleton = () => {
    return (
        <main className="container md:pt-14 pt-5 md:pb-20 pb-10">
            <div className="grid grid-cols-12 gap-12">

                <section className="col-span-4">
                    <div className="rounded-3xl overflow-hidden relative bg-c-black-15 border-2 border-c-black-15 animate-pulse">
                        <div className="aspect-square bg-c-black-20 rounded-3xl"></div>
                    </div>
                </section>

                <section className="col-span-8 space-y-6">
                    <div className="bg-c-black-10 border border-c-black-15 rounded-2.5xl xl:px-8 xl:py-6 md:px-5 md:py-5 px-3.5 py-3.5 animate-pulse">
                        <div className="bg-c-black-20 h-8 w-1/4 rounded"></div>
                        <div className="mt-8 space-y-5">
                            <div className="tracking-wide">
                                <p className="text-c-grey-60 md:text-super-base mb-0.5">Born</p>
                                <div className="bg-c-black-20 h-6 w-3/4 rounded"></div>
                            </div>
                            <div className="tracking-wide">
                                <p className="text-c-grey-60 md:text-super-base mb-0.5">Awards</p>
                                <div className="bg-c-black-20 h-6 w-3/4 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-c-black-10 border border-c-black-15 rounded-2.5xl xl:px-8 xl:py-6 md:px-5 md:py-5 px-3.5 py-3.5 animate-pulse">
                        <p className="text-c-grey-60 md:text-super-base mb-1">Biography</p>
                        <div className="relative max-h-24 overflow-hidden">
                            <div className="bg-c-black-20 h-16 w-full rounded"></div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-white 3xl:text-2.5xl md:text-1.5xl text-xl font-medium bg-c-black-20 h-6 w-1/3 rounded"></h5>
                </div>

                <div className="flex lg:gap-8 gap-4 flex-nowrap overflow-x-auto pb-2.5 custom-scrollbar custom-scrollbar-sm">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            </div>

            <div className="mt-9">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-white 3xl:text-2.5xl md:text-1.5xl text-xl font-medium bg-c-black-20 h-6 w-1/3 rounded"></h5>
                </div>

                <div className="flex lg:gap-8 gap-4 flex-nowrap overflow-x-auto pb-2.5 custom-scrollbar custom-scrollbar-sm">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default DirectorPageSkeleton;