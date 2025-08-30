import MovieCategorySection from "./GenresSection";
import TopMovieSection from "./TopMovieSection";
import TrendingMoviesSection from "./TrendingSection";
import NewReleasedMovieSection from "./NewReleasedSection";
import PopularMoviesSection from "./PopularMoviesSection";

const MovieArticle = () => {
    return (
        <article
            className="relative border border-c-black-15 rounded-xl xl:pt-6 xl:pb-10 pt-3 pb-10 lg:px-8 md:px-6 px-4 md:space-y-16 space-y-11"
        >

            <span
                className="inline-flex absolute md:top-[-20px] top-[-17.5px] md:text-super-sm text-sm items-center bg-c-red-45 text-white rounded-md px-4 
            md:h-[40px] h-[35px]"
            >
                Movies
            </span>

            <MovieCategorySection />

            <TopMovieSection />

            <TrendingMoviesSection />

            <NewReleasedMovieSection />

            <PopularMoviesSection />

        </article>
    );
}

export default MovieArticle;