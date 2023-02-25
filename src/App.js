import './App.css';
import { useState, useEffect, useContext, createContext } from 'react';
import { searchMoviesByName, getProviders, imgUrl, getTrendingMovies } from './api/apiFunctions';
import styled from 'styled-components';
import Providers from './components/Providers';
import SearchInput from './components/SearchInput';


const SearchContext = createContext();

function App() {
  const [mediaType, setMediaType] = useState({
    name: "Movie",
    value: "movie",
  });
  const updateMediaType = (option) => {
    if (option === "movie") {
      setMediaType({
        name: "Movie",
        value: "movie",
      });
    } else if (option === "tv"){
      setMediaType({
        name: "Serie",
        value: "tv",
      });
    }
  };

  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    let promise = getTrendingMovies(mediaType.value);
    promise.then((movies) => {
      setTrendingMovies(movies);
    });
  }, []);
  const defaultProviders = {buy: [], stream: []};
  const [movies, setMovies] = useState([]);
  const [country, setCountry] = useState("CL");
  const [activeMovie, setActiveMovie] = useState(
    {
      id: null,
      providers: defaultProviders,
    }
  );
  
  const updateActiveMovie = (movie) => {
    if (movie.id === activeMovie.id) {
      setActiveMovie({
        id: null,
        providers: defaultProviders,
      });
      return;
    }
    let promise = getProviders(movie, mediaType.value, country);
    promise.then((providers) => {
      setActiveMovie({
        id: movie.id,
        providers: providers,
      });
    });
    // console.log(activeMovie)
  };


  return (
    <Container>
      <Title>Streaming Providers by {mediaType.name}</Title>
      <SearchContext.Provider value={{setMovies, country, setCountry}}>
        <SearchInput placeholder={`Search a ${mediaType.name}...`} context={SearchContext}/>
      </SearchContext.Provider>
      <MoviesContainer>
        {movies.map((movie) => (
          <Movie
          key={movie.id}
          onClick={() => updateActiveMovie(movie, mediaType.value)}
          className={"bg-sky-900 text-gray-200 shadow "}
          style={{minWidth: (movie.id === activeMovie.id? "500px":"200px")}}
          >
            <Image src={imgUrl(movie)} alt={movie.title}/>
            <Info className={movie.id === activeMovie.id? "flex" : "hidden"}>
              <TitleMovie>{movie.title}</TitleMovie>
              <Providers providers={activeMovie.providers}/>
            </Info>
          </Movie>
        ))}
      </MoviesContainer>
      Trending {mediaType.name}s
      <MoviesContainer>
        {trendingMovies.map((movie) => (
          <Movie
          key={movie.id}
          onClick={() => updateActiveMovie(movie, mediaType.value)}
          className={"bg-sky-900 text-gray-200 shadow "}
          style={{minWidth: (movie.id === activeMovie.id? "500px":"200px")}}
          >
            <Image src={imgUrl(movie)} alt={movie.title}/>
            <Info className={movie.id === activeMovie.id? "flex" : "hidden"}>
              <TitleMovie>{movie.title}</TitleMovie>
              <Providers providers={activeMovie.providers}/>
            </Info>
          </Movie>
        ))}
      </MoviesContainer>
    </Container>
  );
}

const Image = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 40px;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: ${window.innerWidth-80}px;
  transition: all 0.5s ease;
`;

const Movie = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    margin-left: 15px;
    margin-right: 15px;
  };
`;

const Info = styled.div`
  // display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: justify;
  height: 300px;
  width: 400px;
  padding-left: 20px;
  padding-right: 20px;
  animation: fadein 2s;
`;

const Title = styled.h2`
  font-size: 1.4em;
  margin: 1em;
  text-align: center;
  font-weight: bold;
`;

const TitleMovie = styled.h3`
  font-size: 1em;
  margin-bottom: 1em;
  text-align: center;
  font-weight: bold;
`;

export default App;
