import React, { useState, useEffect} from "react";
import ReactPlayer from "react-player"
// import ImageGallery from "react-image-gallery"
import GameManager from "../../modules/GameManager";
import "./GameDetail.css";
import ReviewCard from "../../components/games/ReviewCard"

const GameDetail = (props) => {
  const [checkboxes, setCheckboxes] = useState({fav: false, wish:false, comp: false })  
  const [game, setGame] = useState({clip: {}, genres: [], developers: []});
  const [isLoading, setIsLoading] = useState(true)
  const [loggedUser, setLoggedUser] = useState(parseInt(sessionStorage.getItem("credentials")))
  const [review, setReview] = useState({description: ""});
  const [gameReviews, setGameReviews] = useState([])

const getReviews = () => {
    GameManager.getGameReviews(props.gameId)
    .then(reviewsBack => {setGameReviews(reviewsBack)
    });
  }
const handleCheckBoxes = (e) => {
  const stateToChange = {...checkboxes}
  stateToChange[e.target.id] = e.target.checked;
  setCheckboxes(stateToChange)
}
const handleReview = (e) => {
  const stateToChange = {...review}
  stateToChange[e.target.id] = e.target.value;
  setReview(stateToChange)
}
function clearReview(){
   setReview({description: ""})
}
const createReview = (evt) => {
  evt.preventDefault();
  const newReview = {
    userId: parseInt(sessionStorage.getItem("credentials")),
    name: game.name,
    gameApiId: props.gameId,
    description: review.description
}
  GameManager.createReview(newReview).then((review) => {
      clearReview()
      getReviews(props.gameId)
    })
}
const handleCheckboxSave = (e) => {
e.preventDefault()
setIsLoading(true)
  const editedGame = {
    userId: parseInt(loggedUser),
    name: game.name,
    gameApiId: props.gameId,
    isFavorite: checkboxes.fav,
    isWishList: checkboxes.wish,
    isCompletion: checkboxes.comp
  }
  GameManager.getUserGameProps(props.gameId, sessionStorage.getItem("credentials")).then((userGame) => {
    if (checkboxes.fav == false && checkboxes.wish == false && checkboxes.comp == false && userGame.length > 0){
      GameManager.deleteGame(userGame[0].id)
      window.alert("Game removed from your account")
      props.history.push(`/games`)

    }else if (userGame.length != 0){
      GameManager.updateUserGame(editedGame,userGame[0].id).then(() => {
        window.alert("Your game has been updated!")
        props.history.push(`/games`)
      })
    }else if (checkboxes.fav == true || checkboxes.wish == true || checkboxes.comp == true && userGame.length == 0){
      GameManager.createGame(editedGame).then((newgame) => {
        window.alert("Game has been added to your account!")
        props.history.push(`/games`)
      })
    }else{
      window.alert("Please select a list to save to")
    }            
  })
  setIsLoading(false)
}
useEffect(() => {
    GameManager.get(props.gameId)
    .then(gameFromAPI => {setGame(gameFromAPI);
      setLoggedUser(sessionStorage.getItem("credentials"))
    });
    getReviews()
    setIsLoading(false)
},[props.gameId]);


useEffect(() => {
  GameManager.getUserGameProps(props.gameId, sessionStorage.getItem("credentials")).then((userGame)=>{
    if (userGame.length !== 0){
    checkboxes.fav = userGame[0].isFavorite
    checkboxes.wish = userGame[0].isWishList
    checkboxes.comp = userGame[0].isCompletion
    }else{
    checkboxes.fav = false
    checkboxes.wish = false
    checkboxes.comp = false
      
    }
    setIsLoading(false)
  }) 
},[])


  return (
    <div className="game-details">
        <div className = "video-container">
          {game.clip == null && <img src={game.background_image}/>}
          {game.clip !== null &&<ReactPlayer playing={false} controls={true} url={game.clip.clip}/>}
        </div>
      <div className="card-content">
          <h3>
          <span></span>
          </h3>
        <p className = "game-description">{game.description_raw}</p>
        <div className = "genre-container">
        <h3>Genres</h3>
        {game.genres.map(genre => <p key={genre.id} className = "details-genre">{genre.name}</p>)}
        <h3>Developers</h3>
        {game.developers.map(developer => <p key={developer.id}>{developer.name}</p>)}
        </div>
      </div>
      {props.hasUser !== false && <div className= "checkbox-container">
        <label className= "label-checkbox" htmlFor="fav">Add to Favorites</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="fav" type="checkbox" checked={checkboxes.fav} ></input>
        <label className= "label-checkbox" htmlFor="wish">Add to Wish List</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="wish" type="checkbox" checked={checkboxes.wish} ></input>
        <label className= "label-checkbox" htmlFor="comp">Add to Completions</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="comp" type="checkbox" checked={checkboxes.comp} ></input>
        <button onClick={handleCheckboxSave} className="save-checkbox">Save</button>
      </div>}

      <div className= "all-reviews-container">
        <h3 className = "user-reviews-header">Reviews</h3>
      <div className = "new-review-container">
        {props.hasUser !== false && <form className = "new-form-container">

      
        <textarea value = {review.description} onChange = {handleReview} id = "description" className = "new-review-content" placeholder = "Write Review">
        </textarea>
    
        <button type= "submit" id= "submitBtn" className = "submit-review-btn" disabled = {isLoading} onClick={createReview}>Submit
        </button>
        </form>}
      </div>
        <div className = "review-cards">
          {gameReviews.map(review => <ReviewCard setGameReviews={setGameReviews} review={review} key={review.id} {...props}/>)}
        </div>
      </div>
    </div>
  );
};
export default GameDetail;
