import "./App.css";
import { useState, useEffect, createContext } from "react";
import {
  imgUrl,
  getWeeklyTrendingMovies,
  getTrendingByGenre,
} from "./api/apiFunctions";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchInput from "./components/SearchInput";
import LoadingSpin from "./components/LoadingSpin";
import TrendingCarousel from "./components/TrendingCarousel";

const SearchContext = createContext();
const URL = "watchwhere";
const initialState = {
  movies: [],
  trendingWeek: [],
  animes: [],
  crimes: [],
  histories: [],
  loading: false,
  docus: [],
};

function App() {
  const [state, setState] = useState({
    ...initialState,
    mediaType: {
      name: localStorage.getItem("mediaType") === "tv" ? "Serie" : "Movie",
      value: localStorage.getItem("mediaType") || "movie",
    },
  });

  const updateMediaType = (option) => {
    let name = option === "movie" ? "Movie" : "Serie";
    setState(() => ({
      ...initialState,
      mediaType: {
        name,
        value: option,
      },
    }));
    localStorage.setItem("mediaType", option);
  };

  const setMovies = (arrayUpdate) => {
    setState((prevState) => ({
      ...prevState,
      movies: arrayUpdate,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { mediaType } = state;
      const movies = await getWeeklyTrendingMovies(mediaType.value);
      const animes = await getTrendingByGenre(mediaType.value, 16);
      const horror = await getTrendingByGenre(mediaType.value, 99);
      const crimes = await getTrendingByGenre(mediaType.value, 80);
      const dramas = await getTrendingByGenre(mediaType.value, 36);

      setState((prevState) => ({
        ...prevState,
        trendingWeek: movies,
        animes: animes,
        docus: horror,
        crimes: crimes,
        histories: dramas,
      }));
    };

    fetchData();
  }, [state]);

  useEffect(() => {
    const handleEvent = () => {
      setState((prevState) => ({
        ...prevState,
        loading: !prevState.loading,
      }));
    };
    document.addEventListener("thereIsAQuery", handleEvent);
    return () => {
      document.removeEventListener("thereIsAQuery", handleEvent);
    };
  }, []);

  const {
    mediaType,
    movies,
    trendingWeek,
    animes,
    crimes,
    histories,
    loading,
    docus,
  } = state;

  return (
    <Container>
      <div className="flex items-center mb-10">
        <Title>I Wanna Watch a...</Title>
        <Selector
          onChange={(e) => updateMediaType(e.target.value)}
          value={mediaType.value}
        >
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Selector>
      </div>
      <SearchContext.Provider value={{ setMovies }}>
        <SearchInput
          placeholder={`Search a ${mediaType.name}...`}
          context={SearchContext}
          media={mediaType.value}
        />
      </SearchContext.Provider>
      {loading && <LoadingSpin />}
      <MoviesContainer>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            to={`/${URL}/${mediaType.value}/${movie.id}`}
            className="shadow inactive-movie"
          >
            <Image src={imgUrl(movie)} alt={movie.title} />
          </Movie>
        ))}
      </MoviesContainer>
      <TrendingCarousel
        movies={trendingWeek}
        media={mediaType}
        genre="Weekly"
      />
      <TrendingCarousel movies={animes} media={mediaType} genre="Animation" />
      <TrendingCarousel movies={crimes} media={mediaType} genre="Crime" />
      <TrendingCarousel movies={histories} media={mediaType} genre="History" />
      <TrendingCarousel movies={docus} media={mediaType} genre="Documentary" />
    </Container>
  );
}

const Selector = styled.select`
  background-color: #3730a3;
  font-size: 1.2em;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #3730a3;
  &:hover {
    background-color: #4338ca;
  }
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;
const MoviesContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  overflow-y: visible;
  scroll-behavior: smooth;
  transition: all 0.5s ease;
  justify-content: flex-start;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  width: 85vw;
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  // media
  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Movie = styled(Link)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 30px 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 1.4em;
  text-align: center;
  letter-spacing: 1px;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export default App;
