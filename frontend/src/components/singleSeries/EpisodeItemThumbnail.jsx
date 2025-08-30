import { CirclePlayIcon } from "@/assets/Svgs";
import Link from "next/link";

const EpisodeItemThumbnail = ({ seriesId, seriesTitle, seasonNumber, episodeNumber, thumbnail }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden lg:w-52 lg:h-28 md:w-56 md:h-32 h-36 border border-c-black-15">
            <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${thumbnail}`}
                alt={`${seriesTitle} Season ${seasonNumber} Episode ${episodeNumber}`}
                className="w-full h-full object-cover object-center"
            />
            <Link href={`/series/${seriesId}/${seasonNumber}/${episodeNumber}`}>
                <button
                    className="lg:w-[3.1rem] lg:h-[3.1rem] w-[3.4rem] h-[3.4rem] rounded-full flex justify-center items-center
bg-black/60 hover:bg-black/80 transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                >
                    <CirclePlayIcon className="lg:w-[27px] lg:h-[27px] w-[26px] h-[26px] stroke-white" />
                </button>
            </Link>
        </div>
    );
}

export default EpisodeItemThumbnail;