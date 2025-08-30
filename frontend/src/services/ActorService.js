export const fetchActor = async (slug) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor/${slug}`);
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching director:", error);
    }
}

export const fetchActorSeries = async (actorId, currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor/seriesList/${actorId}?page=${currentPage || page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching series:", error);
        // return 404;
    }
}

export const fetchActorMovies = async (actorId, currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor/moviesList/${actorId}?page=${currentPage || page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching series:", error);
    }
}