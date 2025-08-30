import { fetchGenreMovies } from "@/services/MovieService";
import { fetchGenreSeries } from "@/services/SeriesService";
import MovieGenreSection from "./MovieGenreSection";
import SeriesGenreSection from "./SeriesGenreSection";


const SingleGenresPage = async ({ params: { genres } }) => {
    const { movies } = await fetchGenreMovies(genres);
    const { series } = await fetchGenreSeries(genres);

    return (
        <main className="container lg:py-20 py-12 space-y-32">
            <MovieGenreSection movies={movies} genres={genres} />
            <SeriesGenreSection series={series} genres={genres} />
        </main>
    );
}

export default SingleGenresPage;