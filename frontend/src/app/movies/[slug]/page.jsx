import { Suspense } from "react";

import ReviewSection from "@/components/review/ReviewSection";
import CastSection from "@/components/singlePage/CastSection";
import Description from "@/components/singlePage/Description";
import SinglePageLayout from "@/components/layout/singlePage/SinglePageLayout";
import SinglePageSkeleton from "@/components/layout/singlePage/SinglePageSkeleton";
import { fetchSingleMovies } from "@/services/MovieService";
import DownloadSection from "@/components/singlePage/DownloadSection";

const SingleMovie = async ({ params }) => {
    const { slug } = params;

    const movieData = await fetchSingleMovies(slug).then(data => data.movie);

    if (!movieData) return <SinglePageSkeleton />;
    console.log(movieData)
    const { _id: id, description, title, actors, files } = movieData;
    console.log(files)
    return (
        <Suspense fallback={<SinglePageSkeleton />}>
            <SinglePageLayout
                data={movieData}
            >

                {/*//! Description Section */}
                <Description description={description} />

                {/*//! Cast Section */}
                <CastSection actors={actors} />

                <DownloadSection files={files} seriesTitle={title} moviePage />

                {/*//! Previews Section */}
                <ReviewSection id={id} />
            </SinglePageLayout>
        </Suspense>
    );
}

export default SingleMovie;