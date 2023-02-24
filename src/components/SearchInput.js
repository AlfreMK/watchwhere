import styled from 'styled-components';
import { useState, useContext } from 'react';
import { searchMoviesByName } from '../api/apiFunctions';

function SearchInput(props) {

    const {setMovies} = useContext(props.context);
    const [inputValue, setInputValue] = useState("");

    const updateMovies = (query) => {
        let promise = searchMoviesByName(query);
        promise.then((movies) => {
        setMovies(movies);
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateMovies(inputValue);
        }
    }

    return (
        
        <div className="relative mt-1 w-2/3 min-w-300px flex">
            <button className='bg-gray-200 inline-flex items-center rounded-l-full px-4 pr-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-200' >
                    CL
                <i className="gg-chevron-down"></i>
            </button>

            <input 
                id='search'
                type="text" 
                className="w-full pl-5 pr-10 py-2 border-2 border-gray-200 rounded-full rounded-l-none border-l-0 hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Search..."
                autoComplete='off'
                {...props}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            <button
                className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
                onClick={() => updateMovies(inputValue)}
                >
                    <i className="gg-search"></i>
            </button>
        </div>
    );
    }

export default SearchInput;

// bg-gray-800