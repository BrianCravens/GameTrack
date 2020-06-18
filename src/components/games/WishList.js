import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard"
import "../../App.css";

const WishList = (props) => {
    const [games, setGames] = useState([]);
    const getUserGames = () => {
        return GameManager.getWishList().then(wishList => {
            const gameFetches = wishList.map(game => GameManager.get(game.gameApiId))
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
        console.log("games",games)
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
export default WishList