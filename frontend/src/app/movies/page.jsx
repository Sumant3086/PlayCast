import GenresSection from "../explore/movies/GenresSection";
import NewReleasedSection from "../explore/movies/NewReleasedSection";
import PopularMoviesSection from "../explore/movies/PopularMoviesSection";
import TopMovieSection from "../explore/movies/TopMovieSection";
import TrendingMoviesSection from "../explore/movies/TrendingSection";

const SeriesPage = () => {
    return (
        <main className="container md:pt-16 pt-5 md:pb-20 pb-10 space-y-16">

            <GenresSection />

            <TopMovieSection />

            <TrendingMoviesSection />

            <NewReleasedSection />

            <PopularMoviesSection />

        </main>
    );
}

export default SeriesPage;