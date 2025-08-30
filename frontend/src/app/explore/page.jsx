import Carousel from "@/components/carousel/Carousel";
import SubscriptionBox from "@/components/subscription/SubscriptionBox";
import MovieArticle from "./movies/MovieArticle";
import SeriesArticle from "./series/SeriesArticle";


const ExplorePage = () => {
    return (
        <main className="container mt-6 mb-40">

            <Carousel />

            <section className="xl:mt-32 md:mt-28 mt-16 space-y-32 mb-20">

                <MovieArticle />

                <SeriesArticle />

            </section>
            <SubscriptionBox />

        </main>
    );
}

export default ExplorePage;