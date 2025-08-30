import { DownloadIcon, LeftArrowSvg, OutlineStarIcon } from "@/assets/Svgs";
import Link from "next/link";

const EpisodePageSkeleton = () => {
    return (
        <main className="container pt-10 pb-20">
            <div className="w-[85%] mx-auto space-y-6">

                <section className="bg-c-black-10 border border-c-black-15 xl:py-9 xl:px-9 md:px-5 md:py-5 px-3.5 py-3.5 rounded-2.5xl">
                    {/* Video Placeholder */}
                    <div className="aspect-video rounded-[0.9rem] overflow-hidden bg-c-black-20 animate-pulse">
                        <div className="w-full h-full bg-c-black-20" />
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="h-8 bg-c-black-20 animate-pulse rounded w-3/4" />
                        <div className="h-6 bg-c-black-15 animate-pulse rounded w-1/2" />
                        <div className="h-4 bg-c-black-15 animate-pulse rounded w-full" />
                    </div>
                </section>

                <section className="bg-c-black-10 border border-c-black-15 xl:py-7 xl:px-7 md:px-5 md:py-5 px-3.5 py-3.5 rounded-2.5xl">
                    <div className="h-6 bg-c-black-20 animate-pulse rounded w-1/4 mb-4" />

                    {/* Ratings Placeholder */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-c-black-20 animate-pulse rounded-full" />
                            <div className="h-4 bg-c-black-20 animate-pulse rounded w-1/2" />
                        </div>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-3 mt-2.5">
                            {[...Array(2)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-c-black-08 border border-c-black-15 rounded-lg py-3.5 px-4 text-white animate-pulse"
                                >
                                    <div className="h-4 bg-c-black-15 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-c-black-12 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Genres and Released Year Placeholder */}
                    <div className="grid grid-cols-2 gap-10 mt-8">
                        <div className="space-y-3">
                            <div className="h-4 bg-c-black-20 animate-pulse rounded w-1/3" />
                            <div className="flex flex-wrap gap-2.5">
                                {[...Array(2)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-c-black-08 border border-c-black-15 rounded-md px-7 py-1 text-white animate-pulse"
                                    >
                                        <div className="h-4 bg-c-black-20 rounded w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="h-4 bg-c-black-20 animate-pulse rounded w-1/2 mb-3" />
                            <div className="h-8 bg-c-black-15 animate-pulse rounded w-1/3" />
                        </div>
                    </div>

                    {/* Director and Musician Placeholder */}
                    <div className="grid grid-cols-2 gap-10 mt-8">
                        {[...Array(2)].map((_, index) => (
                            <div key={index}>
                                <div className="h-4 bg-c-black-20 animate-pulse rounded w-1/2 mb-3" />
                                <div className="flex bg-c-black-08 border border-c-black-15 rounded-lg p-3.5 mt-2.5 animate-pulse">
                                    <div className="w-16 h-16 bg-c-black-20 rounded-lg mr-3" />
                                    <div className="flex flex-col justify-around w-full">
                                        <div className="h-4 bg-c-black-20 rounded w-3/4 mb-2" />
                                        <div className="h-4 bg-c-black-15 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                <section className="bg-c-black-10 border border-c-black-15 rounded-2xl xl:py-7 xl:px-7 md:px-6 md:py-6 px-5 py-5">
                    {/* Header Placeholder */}
                    <div className="flex items-center justify-between lg:mb-5 mb-4">
                        <div className="h-6 bg-c-black-20 animate-pulse rounded w-1/4" />
                        <div className="flex gap-2.5">
                            <div className="bg-c-black-08 border border-c-black-15 rounded-full flex items-center justify-center md:w-11 md:h-11 w-[2.9rem] h-[2.9rem] animate-pulse">
                                <div className="w-4 h-4 bg-c-black-12 rounded-full" />
                            </div>
                            <div className="bg-c-black-08 border border-c-black-15 rounded-full flex items-center justify-center md:w-11 md:h-11 w-[2.9rem] h-[2.9rem] animate-pulse">
                                <div className="w-4 h-4 bg-c-black-12 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto custom-scrollbar custom-scrollbar-sm pb-2.5">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="relative flex-shrink-0 lg:w-[135px] w-16 h-36 border border-c-black-15 rounded-lg overflow-hidden animate-pulse"
                            >
                                <div className="w-full h-full bg-c-black-20" />
                                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-c-black-06/90 via-c-black-06/70 to-c-black-06/40 opacity-0 group-hover:opacity-100 duration-400"></div>
                                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-c-black-06/90 via-c-black-06/60 to-c-black-06/30 px-2 py-2.5 flex flex-col justify-end">
                                    <div className="h-5 bg-c-black-15 rounded w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-c-black-10 border border-c-black-15 xl:p-9 md:px-5 md:py-5 px-3.5 py-3.5 rounded-2.5xl">
                    {/* Header Placeholder */}
                    <div className="h-6 bg-c-black-20 animate-pulse rounded w-1/4 mb-8" />

                    <div className="bg-c-black-08 border border-c-black-15 rounded-lg mt-4 px-6 py-4 grid grid-cols-5 gap-10">
                        <div className="col-span-2">
                            <div className="h-4 bg-c-black-20 animate-pulse rounded mb-1 w-3/4" />
                            <div className="h-4 bg-c-black-12 animate-pulse rounded w-1/2" />
                        </div>
                        <div className="col-span-2">
                            <div className="h-4 bg-c-black-20 animate-pulse rounded mb-1 w-3/4" />
                            <div className="h-4 bg-c-black-12 animate-pulse rounded w-1/2" />
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="bg-c-black-10 border border-c-black-15 rounded-lg py-2 px-6 max-md:text-super-sm text-c-grey-70 flex items-center animate-pulse">
                                <div className="h-5 bg-c-black-10 animate-pulse rounded w-24" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-c-black-08 border border-c-black-15 rounded-lg mt-4 px-6 py-4 grid grid-cols-5 gap-10">
                        <div className="col-span-2">
                            <div className="h-4 bg-c-black-20 animate-pulse rounded mb-1 w-3/4" />
                            <div className="h-4 bg-c-black-12 animate-pulse rounded w-1/2" />
                        </div>
                        <div className="col-span-2">
                            <div className="h-4 bg-c-black-20 animate-pulse rounded mb-1 w-3/4" />
                            <div className="h-4 bg-c-black-12 animate-pulse rounded w-1/2" />
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="bg-c-black-10 border border-c-black-15 rounded-lg py-2 px-6 max-md:text-super-sm text-c-grey-70 flex items-center animate-pulse">
                                <div className="h-5 bg-c-black-10 animate-pulse rounded w-24" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default EpisodePageSkeleton;