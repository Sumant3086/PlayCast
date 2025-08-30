"use client"
import { PlaySvg } from "@/assets/Svgs";
import Link from "next/link";

const HomeTitle = () => {
    return (
        <section className="relative -top-20 pt-4">
            <h2 className="font-semibold text-center 2xl:text-5xl lg:text-4.5xl md:text-4xl text-2xl mb-4 text-white">The Best Streaming Experience</h2>

            <p
                className="text-c-grey-60 text-center 3xl:text-super-base lg:text-sm md:text-sm text-xs mb-5 
          mx-auto xl:w-3/5 md:w-3/4 max-md:px-10 max-sm:px-5"
            >
                PlayCast is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With
                PlayCast, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. <br />
                You can also create your own watchlists, so you can easily find the content you want to watch.
            </p>
            <Link href="/explore">
                <button
                    className="bg-c-red-45 text-white xl:px-6 md:px-4 px-3 xl:py-2.5 md:py-2 py-1.5 rounded-lg md:text-sm text-super-xs flex items-center gap-2 mx-auto"
                >
                    <PlaySvg /> Start Watching Now
                </button>
            </Link>
        </section>
    );
}

export default HomeTitle;