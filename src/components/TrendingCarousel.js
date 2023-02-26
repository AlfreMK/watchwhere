import styled from "styled-components";
import { Link } from "react-router-dom";
import { imgUrl } from "../api/apiFunctions";
import LoadingSpin from "./LoadingSpin";


const URL = "watchwhere";

function TrendingCarousel(props) {
    return (
        <Container>
            <TitleTrending>
            {props.genre} Trending {props.media.name}s
            </TitleTrending>
                {props.movies.length === 0 && <LoadingSpin/>}
                <MoviesContainer>
                {props.movies.map((movie) => (
                <Movie
                key={movie.id}
                to={`/${URL}/movie/${movie.id}/${props.media.value}`}
                className={"shadow inactive-movie "}
                >
                    <Image src={imgUrl(movie)} alt={movie.title}/>
                </Movie>
                ))}
            </MoviesContainer>
        </Container>
    )
}

export default TrendingCarousel;

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
  margin: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    margin-left: 15px;
    margin-right: 15px;
  };
`;


const TitleTrending = styled.h2`
  font-size: 1.2em;
  width: 83vw;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

