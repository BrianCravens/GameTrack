import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import MyReviewCard from "./MyReviewCards";
import "../../App.css";

const MyReviewsList = (props) => {
    const [reviews, setReviews] = useState([]);
    
    // const getUserReviews = () => {
    //     return GameManager.getUserReviews(sessionStorage.getItem("credentials")).then(reviews => {        
    //         setReviews(reviews)
    //     });
    // };
    useEffect(() => {
        const user = sessionStorage.getItem("credentials")
            GameManager.getUserReviews(user).then(myReviews => {        
            setReviews(myReviews)
        });
    }, []);
    return(
        <>
        <section className="section-content">
            <div className="container-cards">
                {reviews.map(review => <MyReviewCard review={review} key={review.id} {...props}/>)}
            </div>
        </section>
        </>
    )
}
export default MyReviewsList