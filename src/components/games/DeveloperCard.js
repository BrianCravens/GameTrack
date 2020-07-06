import React from "react";
import "../../App.css"
import { Link } from "react-router-dom";

const DeveloperCard = (props) => {
    return(
        <div className="card">
            <Link  className="game-card-link" to ={`/developers/${props.developer.id}/games`} style={{ textDecoration: 'none' }}>
            <div className="card-content">
                    <img src={props.developer.image_background} alt={"background image" + props.gameId}/>
                <h3 className = "game-name-h3">
                    <span className = "card-name">{props.developer.name}</span>
                </h3>
            <p className = "count">Game Count: {props.developer.games_count}</p>
            </div>
            </Link>
        </div>
    )
}
export default DeveloperCard