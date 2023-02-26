import { useState, useContext } from 'react';
import { searchMoviesByName } from '../api/apiFunctions';

function SearchInput(props) {

    const {setMovies} = useContext(props.context);
    const [inputValue, setInputValue] = useState("");

    const updateMovies = (query) => {
        document.dispatchEvent(new Event("thereIsAQuery"));
        let promise = searchMoviesByName(query, props.media);
        promise.then((movies) => {
            setMovies(movies);
            document.dispatchEvent(new Event("thereIsAQuery"));
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateMovies(inputValue);
        }
    }

    return (
        <div className="relative mt-1 w-2/3 min-w-300px flex">
            <input 
                id='search'
                type="text" 
                className="w-full pl-6 pr-10 text-black py-2 border-2 border-indigo-200 rounded-full hover:border-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors text-sm md:text-base"
                placeholder="Search..."
                autoComplete='off'
                {...props}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            <button
                className="block w-7 h-7 text-center text-xl leading-0 absolute top-1 md:top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-700 transition-colors"
                onClick={() => updateMovies(inputValue)}
                >
                    <i className="gg-search"></i>
            </button>
        </div>
    );
    }

export default SearchInput;

// bg-gray-800