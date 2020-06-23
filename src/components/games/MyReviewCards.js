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
        console.log(games)
    }, [props.review.id])
    //  useEffect(() =>{  
    //     console.log(games)
    // }, [games])
    return(
        <div className="card">
            <Link to ={`/games/${games.id}`}>
            <div className="card-content">
                <picture>
                    <img src={games.background_image} alt={"background image" + props.review.id}/>
                </picture>
                <h3>
                    <span className = "card-name">{props.review.name}</span>
                </h3>
            <p>{props.review.description}</p>
                {/* <div className = "genre-container">
                    {props.game.genres.slice(0,2).map(genre => <p key={genre.id} className = "genre">{genre.name}</p>)}
                </div>
            <p className = "rating">{props.game.rating}</p> */}
            <div className = "Info">
            {/* <button className = "btn-Info" onClick={() => props.history.push(`/games/${games.id}`)}>Info</button> */}
            </div></div>
            </Link>
        </div>
    )
}
export default MyReviewCard