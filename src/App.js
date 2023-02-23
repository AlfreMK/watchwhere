import './App.css';
import { useState, useEffect } from 'react';
import { searchMoviesByName, getProviders, imgUrl } from './api/apiFunctions';
import styled from 'styled-components';
import Providers from './components/Providers';


function App() {
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(
    {
      id: null,
      providers: {buy: [], stream: []},
    }
  );
  let promise = searchMoviesByName("Harry Potter");
    promise.then((movies) => {
      setMovies(movies);
    });

  const updateActiveMovie = (movie) => {
    if (movie.id === activeMovie.id) {
      setActiveMovie({
        id: null,
        providers: {buy: [], stream: []},
      });
      return;
    }
    let promise = getProviders(movie, "CL");
    promise.then((providers) => {
      setActiveMovie({
        id: movie.id,
        providers: providers,
      });
    });
    console.log(activeMovie)
  };

  return (
    <Container>
      <Title>Providers by Movie</Title>
      <MoviesContainer>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            onClick={() => updateActiveMovie(movie)}
            className={movie.id === activeMovie.id? "w-600px": "w-200px"}
            >
            <Image src={imgUrl(movie)} alt={movie.title}/>
            <Info className={movie.id === activeMovie.id? "flex" : "hidden"}>
              <Title>{movie.title}</Title>
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
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  transition: all 0.5s ease;
`;

const Movie = styled.div`
  display: flex;
  flex-direction: row;
  // width: 200px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
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
  font-size: 1em;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

export default App;
