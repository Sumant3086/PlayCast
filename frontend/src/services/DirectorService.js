export const fetchDirector = async (slug) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/director/${slug}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching director:", error);
    }
}

export const fetchDirectorSeries = async (directorId, currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/director/seriesList/${directorId}?page=${currentPage || page}`, {
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

export const fetchDirectorMovies = async (directorId, currentPage, page) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/director/moviesList/${directorId}?page=${currentPage || page}`, {
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