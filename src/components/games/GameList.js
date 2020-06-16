import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard";
import "../../App.css";

const GameList = (props) => {
    const [games, setGames] = useState([]);
    const getGames = () => {
        return GameManager.getAll().then(gamesFromAPI => {        
            setGames(gamesFromAPI.results)
        });
    };
    useEffect(() => {
        getGames();
    }, []);
    return(
        <>
        <section className="section-content">
            <div className="container-cards">
                {games.map(game => <GameCard game={game} key={game.id} {...props}/>)}
            </div>
        </section>
        </>
    )
}
export default GameList