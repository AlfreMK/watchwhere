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
      {props.movies.length === 0 && <LoadingSpin />}
      <MoviesContainer>
        {props.movies.map((movie) => (
          <Movie
            key={movie.id}
            to={`/${URL}/${props.media.value}/${movie.id}`}
            className={"shadow inactive-movie "}
          >
            <Image src={imgUrl(movie)} alt={movie.title} />
          </Movie>
        ))}
      </MoviesContainer>
    </Container>
  );
}

export default TrendingCarousel;

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
  margin: 0 10px;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    transform: scale(1.05);
  }
`;

const TitleTrending = styled.h2`
  font-size: 1.2em;
  width: 80vw;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;
