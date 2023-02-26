import './App.css';
import { useState, useEffect, createContext } from 'react';
import { imgUrl, getTrendingMovies } from './api/apiFunctions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
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
  }, [mediaType]);
  const [movies, setMovies] = useState([]);
  

  return (
    <Container>
      <span className='inline-flex items-center justify-center mt-6'>
        <Title>Streaming Providers by</Title>
        <Selector onChange={(e) => {updateMediaType(e.target.value); setMovies([])}}>
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Selector>
      </span>
      <SearchContext.Provider value={{setMovies}}>
        <SearchInput placeholder={`Search a ${mediaType.name}...`} context={SearchContext} media={mediaType.value}/>
      </SearchContext.Provider>
      <MoviesContainer>
        {movies.map((movie) => (
          <Movie
          key={movie.id}
          to={`/movie/${movie.id}/${mediaType.value}`}
          className={"shadow inactive-movie "}
          >
            <Image src={imgUrl(movie)} alt={movie.title}/>
          </Movie>
        ))}
      </MoviesContainer>
      <TitleTrending>
      Trending {mediaType.name}s
      </TitleTrending>
      <MoviesContainer>
        {trendingMovies.map((movie) => (
          <Movie
          key={movie.id}
          to={`/movie/${movie.id}/${mediaType.value}`}
          className={"shadow inactive-movie "}
          >
            <Image src={imgUrl(movie)} alt={movie.title}/>
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

const MoviesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 40px;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-behavior: smooth;
  transition: all 0.5s ease;
  justify-content: flex-start;
  width: ${window.innerWidth-80}px;
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
  // justify-content: center;
  // flex-wrap: wrap;
`;

const Selector = styled.select`
  background-color: #3730a3;
  font-weight: bold;
  font-size: 1.2em;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #3730a3;
  margin-left: 10px;
  &:hover {
    background-color: #4338ca;
  };
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Movie = styled(Link)`
  display: flex;
  flex-direction: row;
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
  width: 400px;
  padding-left: 20px;
  padding-right: 20px;
  animation: fadein 2s;
`;

const Title = styled.h2`
  font-size: 1.4em;
  margin: 1em 0;
  text-align: center;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const TitleMovie = styled.h3`
  font-size: 1em;
  margin-bottom: 1em;
  text-align: center;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const TitleTrending = styled.h2`
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

export default App;
