import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player"
import ImageGallery from "react-image-gallery"
import GameManager from "../../modules/GameManager";
import "./GameDetail.css";

const GameDetail = (props) => {
  const [checkboxes, setCheckboxes] = useState({fav: false, wish:false, comp: false })  
  const [game, setGame] = useState({clip: {}, genres: [], developers: []});
  const [isLoading, setIsLoading] = useState(true)
  const [loggedUser, setLoggedUser] = useState(parseInt(sessionStorage.getItem("credentials")))
  console.log(loggedUser)

const handleCheckBoxes = (e) => {
  const stateToChange = {...checkboxes}
  stateToChange[e.target.id] = e.target.checked;
  setCheckboxes(stateToChange)
}

const handleCheckboxSave = () => {
  //create new game object
  //add properties to that object
  //--gameId, userId, checkbox props
  //POST to DB
  //redirect ?
  const editedGame = {
    userId: loggedUser,
    gameApiId: props.gameId,
    isfavorite: checkboxes.fav,
    isWishList: checkboxes.wish,
    isCompletion: checkboxes.comp
  }
  GameManager.getUserGame(props.gameId).then((userGame) => {
    if (userGame = !undefined){window.alert("game exists")
  }else{
    
      GameManager.createGame(editedGame).then((newgame) => {
      window.alert("Game has been added to your account!")
      props.history.push(`/games`)
    
    })
  }            
})
  

}

useEffect(() => {
    GameManager.get(props.gameId)
    .then(gameFromAPI => {setGame(gameFromAPI);
    });
    setIsLoading(false)

  },[props.gameId]);
useEffect(() => {
}, [game])

  return (
    <div className="card">
        <div className = "picture-container">
          <ReactPlayer playing={false} controls={true} url={game.clip.clip}/>
        </div>
      <div className="card-content">
          <h3>
          <span></span>
          </h3>

        <p>{game.description_raw}</p>
        <label>Genres</label>
        {game.genres.map(genre => <p key={genre.id} className = "details-genre">{genre.name}</p>)}
        <label>Developers</label>
        {game.developers.map(developer => <p key={developer.id}>{developer.name}</p>)}
      </div>
      <div className= "checkbox-container">
        <label className= "label-checkbox" htmlFor="fav">Add to Favorites</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="fav" type="checkbox" checked={checkboxes.fav} ></input>
        <label className= "label-checkbox" htmlFor="wish">Add to Wish List</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="wish" type="checkbox" checked={checkboxes.wish} ></input>
        <label className= "label-checkbox" htmlFor="comp">Add to Completions</label>
        <input onChange={handleCheckBoxes} className= "checkbox"id="comp" type="checkbox" checked={checkboxes.comp} ></input>
        <button onClick={handleCheckboxSave} className="save-checkbox">Save</button>
      </div>
    </div>
  );
};
export default GameDetail;
