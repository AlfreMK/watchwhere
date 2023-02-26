import './App.css';
import { useState, useEffect, createContext } from 'react';
import { imgUrl, getWeeklyTrendingMovies, getTrendingByGenre } from './api/apiFunctions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import SearchInput from './components/SearchInput';
import LoadingSpin from './components/LoadingSpin';
import TrendingCarousel from './components/TrendingCarousel';

const SearchContext = createContext();
const URL = "watchwhere";


function App() {
  const [mediaType, setMediaType] = useState({
    name: "Movie",
    value: "movie",
  });
  const [movies, setMovies] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [crimes, setCrimes] = useState([]);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [docus, setDocus] = useState([]);


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

  useEffect(() => {
    let promise = getWeeklyTrendingMovies(mediaType.value);
    promise.then((movies) => {
      setTrendingWeek(movies);
    });
    let promise2 = getTrendingByGenre(mediaType.value, 16);
    promise2.then((animes) => {
      setAnimes(animes);
    });
    let promise3 = getTrendingByGenre(mediaType.value, 99);
    promise3.then((horror) => {
      setDocus(horror);
    }
    );
    let promise4 = getTrendingByGenre(mediaType.value, 80);
    promise4.then((crimes) => {
      setCrimes(crimes);
    }
    );
    let promise5 = getTrendingByGenre(mediaType.value, 36);
    promise5.then((dramas) => {
      setHistories(dramas);
    }
    );
  }, [mediaType]);


  // add event listener to listen when user presses enter or clicks search button
  useEffect(() => {
    const handleEvent = () => {
        setLoading(!loading);
    }
    document.addEventListener("thereIsAQuery", handleEvent);
    return () => {
        document.removeEventListener("thereIsAQuery", handleEvent);
    }
}, [loading]);

  return (
    <Container>
      <div className='flex items-center mb-10'>
        <Title>I Wanna Watch a...</Title>
        <Selector onChange={(e) => {updateMediaType(e.target.value); setMovies([])}}>
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Selector>
      </div>
      <SearchContext.Provider value={{setMovies}}>
        <SearchInput placeholder={`Search a ${mediaType.name}...`} context={SearchContext} media={mediaType.value}/>
      </SearchContext.Provider>
      {loading && <LoadingSpin/>}
      <MoviesContainer>
        {movies.map((movie) => (
          <Movie
          key={movie.id}
          to={`/${URL}/movie/${movie.id}/${mediaType.value}`}
          className={"shadow inactive-movie "}
          >
            <Image src={imgUrl(movie)} alt={movie.title}/>
          </Movie>
        ))}
      </MoviesContainer>
      <TrendingCarousel movies={trendingWeek} media={mediaType} genre={"Weekly"}/>
      <TrendingCarousel movies={animes} media={mediaType} genre={"Animation"}/>
      <TrendingCarousel movies={crimes} media={mediaType} genre={"Crime"}/>
      <TrendingCarousel movies={histories} media={mediaType} genre={"History"}/>
      <TrendingCarousel movies={docus} media={mediaType} genre={"Documentary"}/>
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
  // justify-content: center;
  // flex-wrap: wrap;
`;

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
