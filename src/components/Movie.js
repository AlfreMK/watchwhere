import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { getMovieById, getProviders, imgUrl } from '../api/apiFunctions';
import Providers from './Providers';
import styled from 'styled-components';
import countries from '../api/countries.json';
import { findFlagUrlByIso2Code } from 'country-flags-svg';
import LoadingSpin from './LoadingSpin';

function Movie(){
    const {id} = useParams();
    const {media} = useParams();
    const [country, setCountry] = useState(localStorage.getItem("country") || "CL");
    const [dropdown, setDropdown] = useState(false);
    

    const [movie, setMovie] = useState({id: undefined});
    const [providers, setProviders] = useState({buy: [], stream: []});
    
    useEffect(() => {
        let promise = getMovieById(id, media);
        promise.then((movie) => {
            setMovie(movie);
        });
    }, [id, media]);
    useEffect(() => {
        if (movie.id === undefined) {
            return;
        }
        let promise = getProviders(movie, media, country);
        promise.then((providers) => {
            setProviders(providers);
        });
    }, [movie, media, country]);
    // if there is click outside the dropdown, close it
    document.addEventListener('click', (e) => {
        if (e.target.id !== 'dropdown-buttton' && e.target.id !== 'dropdown') {
            setDropdown(false);
        }
    });
    return (
        <Container className='m-2'>
            {movie.id === undefined && <LoadingSpin/>}
            {movie.id !== undefined && 
            <Container>
                <MoviePoster style={{backgroundImage: `url(${imgUrl(movie)})`}} />
                <MovieFront>
                    <Image src={imgUrl(movie)} alt={movie.title}/>
                    <Title>{movie.title}</Title>
                </MovieFront>
                <Info>
                    <Dropdown>
                        <button 
                            id='dropdown-buttton'
                            className='flex bg-indigo-800 px-6 py-2 items-center rounded-xl border border-indigo-700 hover:border-indigo-900 hover:bg-indigo-700'
                            onClick={(e) => {setDropdown(!dropdown)}}
                            >
                            <img className="inline-flex w-6 h-4 mr-2 pointer-events-none" src={findFlagUrlByIso2Code(country)} alt={country} />
                            {country}
                            <i className="gg-chevron-down pointer-events-none"></i>
                        </button>
                        <div 
                            id='dropdown'
                            className={"top-12 absolute bg-indigo-900 divide-y divide-gray-100 rounded-lg shadow-xl cursor-pointer "+ (dropdown? "block" : "hidden")}>
                            <ul className="text-sm overflow-y-scroll h-40" >
                                {countries.map((country) => (
                                    <li key={country} className="py-2 px-6 hover:bg-indigo-800 rounded-lg"
                                        onClick={() => {setCountry(country); setDropdown(false);localStorage.setItem('country', country)}} >
                                        <img className="inline-block w-6 h-4 mr-2" src={findFlagUrlByIso2Code(country)} alt={country} />
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Dropdown>
                    <Overview>{movie.overview}</Overview>
                    <Providers providers={providers}/>
                </Info>
            </Container>
            }
        </Container>
    );
}

export default Movie;

const Image = styled.img`
    width: 300px;
    height: 450px;
    margin: 5px;
    box-shadow: 2px 2px 4px #000000;
    @media (max-width: 768px) {
        width: 200px;
        height: 300px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const MoviePoster = styled.div`
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    opacity: 0.5;
    @media (max-width: 768px) {
        height: 300px;
    }
`;

const MovieFront = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    padding: 50px 20px;
`;

const Overview = styled.p`
    font-size: 1rem;
    text-align: justify;
    margin-bottom: 30px;
`;

    
const Title = styled.h1`
    text-shadow: 2px 2px 4px #000000;
    font-size: 2rem;
    margin: 0 20px;
    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    margin: 20px;
`;