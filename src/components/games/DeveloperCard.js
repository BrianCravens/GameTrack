import React from "react";
import "../../App.css"

const DeveloperCard = (props) => {
    return(
        <div className="card">
            <div className="card-content">
                
                    <img src={props.developer.image_background} alt={"background image" + props.gameId}/>
                <h3>
                    <span className = "card-name">{props.developer.name}</span>
                </h3>
            <p className = "count">Game Count: {props.developer.games_count}</p>
            <div className = "Info">
            <button className = "btn-Info" onClick={() => props.history.push(`/developers/${props.developer.id}/games`)}>Info</button>
            </div></div>
        </div>
    )
}
export default DeveloperCard