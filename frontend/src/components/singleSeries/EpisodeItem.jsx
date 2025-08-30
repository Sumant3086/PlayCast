import { CirclePlayIcon, DownloadIcon, WatchSvg } from "@/assets/Svgs";
import Link from "next/link";
import EpisodeItemThumbnail from "./EpisodeItemThumbnail";
import EpisodeItemInfo from "./EpisodeItemInfo";

const EpisodeItem = ({ seriesId, seriesTitle, episodeNumber, seasonNumber, title, runtime, description, thumbnail }) => {
    return (
        <div className="flex items-center lg:py-6 py-4 2xl:gap-6 gap-3 border-b border-b-c-black-15 last:border-b-0">
            <span className="xl:text-2xl text-1.5xl text-c-grey-60 font-semibold">
                {episodeNumber}
            </span>
            <div className="flex-1 flex 2xl:gap-4 md:gap-2.5 md:flex-row flex-col">
                <EpisodeItemThumbnail
                    seriesId={seriesId}
                    seriesTitle={seriesTitle}
                    seasonNumber={seasonNumber}
                    episodeNumber={episodeNumber}
                    thumbnail={thumbnail}
                />
                <EpisodeItemInfo
                    title={title}
                    seriesId={seriesId}
                    seasonNumber={seasonNumber}
                    episodeNumber={episodeNumber}
                    description={description}
                    runtime={runtime}
                />
            </div>
        </div>
    )
};

export default EpisodeItem;