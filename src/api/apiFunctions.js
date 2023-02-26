import not_found from "../images/not_found.png";


const API_KEY = process.env.REACT_APP_API_KEY;
const URL = "https://api.themoviedb.org/3";


const parseMovies = (d) => ({
    id : d.id,
    title: d.title,
    img: d.poster_path,
    overview: d.overview,
});

const parseProviders = (d) => ({
    buy: d.buy || [],
    stream: d.flatrate || [],
});

async function searchMoviesByName(name, media) {
    // const url = `${URL}/search/movie?api_key=${API_KEY}&query=${name}`;
    // sort_by=popularity.desc
    const url = `${URL}/search/${media}?api_key=${API_KEY}&sort_by=popularity.desc&query=${name}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results.map(parseMovies);
        // filter results with null poster_path
        return results.filter((movie) => movie.img !== null).slice(0, 20);
        // return results;
    }
    catch(error){
        console.error(error);
    }
    return [];
}

async function getMovieById(id, media) {
    const url = `${URL}/${media}/${id}?api_key=${API_KEY}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = parseMovies(data);
        return results;
    }
    catch(error){
        console.error(error);
    }
    return {};
}

async function getWeeklyTrendingMovies(media) {
    const url = `${URL}/trending/${media}/week?api_key=${API_KEY}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results.map(parseMovies);
        return results.slice(0, 20);
    }
    catch(error){
        console.error(error);
    }
    return [];
}

async function getDailyTrendingMovies(media) {
    const url = `${URL}/trending/${media}/day?api_key=${API_KEY}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results.map(parseMovies);
        return results.slice(0, 20);
    }
    catch(error){
        console.error(error);
    }
    return [];
}

async function getTrendingByGenre(media, genre) {
    const url = `${URL}/discover/${media}?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${genre}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results.map(parseMovies);
        return results.slice(0, 20);
    }
    catch(error){
        console.error(error);
    }
    return [];
}

async function getProviders(movie, media, country) {
    const url = `${URL}/${media}/${movie.id}/watch/providers?api_key=${API_KEY}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const results = parseProviders(data.results[country])
        return results;
    }
    catch(error){
        console.error(error);
    }
    return {buy: [], stream: []};
}

function imgUrl(movie) {
    if (movie.img === null) {
        return not_found
    }        
    else{
        return `https://image.tmdb.org/t/p/w500${movie.img}`;
    }
}

function logoProvider(provider) {
    if (provider.logo_path === null) {
        return not_found
    }        
    else{
        return `https://image.tmdb.org/t/p/w500${provider.logo_path}`;
    }
}


export {
    searchMoviesByName,
    getMovieById,
    getProviders,
    imgUrl,
    logoProvider,
    getWeeklyTrendingMovies,
    getDailyTrendingMovies,
    getTrendingByGenre,
};