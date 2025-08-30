import GenresSection from "../explore/series/GenresSection";
import NewReleasedSection from "../explore/series/NewReleasedSection";
import PopularSeriesSection from "../explore/series/PopularSeriesSection";
import TopSeriesSection from "../explore/series/TopSeriesSection";
import TrendingSeriesSection from "../explore/series/TrendingSection";

const SeriesPage = () => {
    return (
        <main className="container md:pt-16 pt-5 md:pb-20 pb-10 space-y-16">

            <GenresSection />

            <TopSeriesSection />

            <TrendingSeriesSection />

            <NewReleasedSection />

            <PopularSeriesSection />

        </main>
    );
}

export default SeriesPage;