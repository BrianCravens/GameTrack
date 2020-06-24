import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard";
import "../../App.css";

const GameList = (props) => {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState({});
    const [genres, setGenres] = useState([]);
    const [genreSelected, setGenreSelected] = useState({genre: ""})

    const handleSelection = (event) => {
        const stateToChange = {...genreSelected};
        stateToChange[event.target.id] = event.target.value.toLowerCase();
        setGenreSelected(stateToChange);
        
        
    }
    //update state for search parameter
    const handleFieldChange = (event) => {
        const stateToChange = {...search};
        stateToChange[event.target.id] = event.target.value;
        setSearch(stateToChange);
        searchGames()
        
    }
    //Search for games with input field
    const searchGames = () => {
        return GameManager.getSearchName(JSON.stringify(search)).then(searchGamesBack => {setGames(searchGamesBack.results)})
    }
    //Get Genres List from API
    const getGenres = () => {
        return GameManager.getAllGenres().then(genresBack => {
            setGenres(genresBack.results)
        });
    };
    const getGenreGames = (genre) => {
        return GameManager.getGamesByGenre(genre).then(gamesBack => {setGames(gamesBack.results)
            console.log(genre)
        })
    }
    //Default request of games from API
    const getGames = () => {
        return GameManager.getAll().then(gamesFromAPI => {
            setGames(gamesFromAPI.results)
        });
    };
    useEffect(() => {
        getGames();
        getGenres();
    }, []);
    useEffect(() => {
        getGenreGames(genreSelected.genre)
    }, [genreSelected] )
    return(
        <>
        <section className="section-content">
            <div className="select-container">
                <label className="genre-label" htmlFor= "genre">Filter by Genre</label>
                <select className="filter-genre" id="genre" onSelect={getGenreGames} onChange={handleSelection}>{genres.map(MakeList => <option value = {MakeList.id}>{MakeList.name}</option>)}</select>
            <div className="search-container">
                <input onChange={handleFieldChange} className= "search-input" type="Text" placeholder="Search"></input>
                <button onClick={searchGames} className= "search-btn">Search</button>
            </div>
            </div>
            
            <div className="container-cards">
                {games.map(game => <GameCard game={game} key={game.id} {...props}/>)}
            </div>
        </section>
        </>
    )
}
export default GameList