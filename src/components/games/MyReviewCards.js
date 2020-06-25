import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../../App.css"
import GameManager from "../../modules/GameManager"

const MyReviewCard = (props) => {
    const [games, setGames] = useState([]);
    const getUserGame = (id) => {
        return GameManager.getReviewId(id).then(reviewList => {
            GameManager.get(reviewList.gameApiId)
            .then((game) => {setGames(game)
            })
           
        })  
    
    };
     useEffect(() =>{
        getUserGame(props.review.id);  
    }, [props.review.id])
   
    return(
        <div className="card">
            <Link to ={`/games/${games.id}`} style={{ textDecoration: 'none' }}>
            <div textDec className="card-content">
            <picture>
                <img src={games.background_image} alt={"background image" + props.review.id}/>
             </picture>
            <h3>
                <span className = "card-name">{props.review.name}</span>
            </h3>
            <p className="myreview-description">{props.review.description}</p>
            </div>
            </Link>
        </div>
    )
}
export default MyReviewCard