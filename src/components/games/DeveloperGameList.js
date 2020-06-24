import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import GameCard from "./GameCard";
import "../../App.css";

const DeveloperGameList = (props) => {
    const [games, setGames] = useState([]);
    
    const getDeveloperGames = () => {
        return GameManager.getDeveloperGames(props.devId).then(games => {        
            setGames(games.results)
        });
    };
    useEffect(() => {
        getDeveloperGames()
        },[]);
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
export default DeveloperGameList