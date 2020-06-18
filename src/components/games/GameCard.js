import React from "react";
import "../../App.css"

const GameCard = (props) => {
    return(
        <div className="card">
            <div className="card-content">
                <picture>
                    <img src={props.game.background_image} alt="background image"/>
                </picture>
                <h3>
                    <span className = "card-name">{props.game.name}</span>
                </h3>
                <div className = "genre-container">
                    {props.game.genres.slice(0,2).map(genre => <p key={genre.id} className = "genre">{genre.name}</p>)}
                </div>
            <p className = "rating">{props.game.rating}</p>
            <div className = "Info">
            <button className = "btn-Info" onClick={() => props.history.push(`/games/${props.game.id}`)}>Info</button>
            </div></div>
        </div>
    )
}
export default GameCard