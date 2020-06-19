import React, { useEffect, useState } from "react";
import '../games/GameDetail.css';
import GameManager from '../../modules/GameManager'

const ReviewCard = (props) => {
    const [username, setUsername] = useState({})
    const getUsername = (id) => {
        GameManager.getUserId(id).then(user => {
            setUsername(user)
    
        })
        
    }
    useEffect(() => {
        getUsername(props.review.userId)
    },[])
    return(
        <div className= "reviews-container">
            <h3>{username.username}</h3>
    <div className = "review-content">{props.review.description}</div>
        </div>
    )
}
export default ReviewCard