import React from "react";
import "../../App.css"
import { FaXbox } from 'react-icons/fa'
import { FaDesktop } from 'react-icons/fa'
import { FaPlaystation } from 'react-icons/fa'
import {Link} from "react-router-dom";

const GameCard = (props) => {
    
    return(
        <div className="card">
                 <Link  className="game-card-link" to ={`/games/${props.game.id}`} style={{ textDecoration: 'none' }}>
            <div className="card-content">
                
                    <img className="card-img" src={props.game.background_image} alt={"background image" + props.gameId}/>
                <h3 className="game-name-h3">
                    <span className = "card-name">{props.game.name}</span>
                </h3>
                {props.game.parent_platforms != undefined && <div className="platform-icons">
                    {props.game.parent_platforms.map(parentPlatform => {if (parentPlatform.platform.name == "Xbox"){return <FaXbox size='2rem'/>
                    }else if (parentPlatform.platform.name == "PC"){return <FaDesktop size='2rem'/>
                    }else if (parentPlatform.platform.name == "PlayStation"){return <FaPlaystation size='2rem'/>
                    }})}
                </div>}
                <div className = "genre-container">
                    {props.game.genres.slice(0,2).map(genre => <p key={genre.id} className = "genre">{genre.name}</p>)}
                </div>
            </div>
            <div className="rating">{props.game.rating}</div>
            </Link>
        </div>
    )
}
export default GameCard