import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard"
import "../../App.css";

const FavList = (props) => {
    const [games, setGames] = useState([]);
    const getUserGames = () => {
        return GameManager.getFavGames().then(favGames => {
            const gameFetches = favGames.map(game => GameManager.get(game.gameApiId))
            Promise.all(gameFetches)
            .then((games) => {
                setGames(games)
            })  
        })  
    };
    useEffect(() => {
        getUserGames();
    }, []);
    useEffect(() => {
    }, [games]);

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
export default FavList