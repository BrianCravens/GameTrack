import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard"
import "../../App.css";

const FavList = (props) => {
    const [games, setGames] = useState([]);
    const getUserGames = (id) => {
        return GameManager.getFavGames(id).then(favGames => {
            const gameFetches = favGames.map(game => GameManager.get(game.gameApiId))
            Promise.all(gameFetches)
            .then((games) => {
                setGames(games)
            })  
        })  
    };
    useEffect(() => {
        getUserGames(sessionStorage.getItem("credentials"));
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