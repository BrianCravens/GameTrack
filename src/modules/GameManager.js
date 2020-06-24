const remoteURL = "http://localhost:5002"

export default {

    getAll() {
        return fetch ('https://api.rawg.io/api/games?page_size=200').then(result => result.json())
    },
    get(id){
      return fetch (`https://api.rawg.io/api/games/${id}`).then(result => result.json())
    },
    getMovie(id){
      return fetch (`https://api.rawg.io/api/games/${id}/movies`).then(result => result.json())
    },
    getSearchName(inputText){
      return fetch (`https://rawg.io/api/games?page_size=200&search=${inputText}&page=1`).then(result => result.json())
    },
    getSearchDeveloper(inputText){
      return fetch (`https://rawg.io/api/developers?page_size=200&search=${inputText}&page=1`).then(result => result.json())
    },
    getGamesByGenre(genre){
      return fetch (`https://rawg.io/api/games?genres=${genre}&page_size=200&page=1`).then(result => result.json())
    },
    getAllGenres(){
      return fetch (`https://api.rawg.io/api/genres`).then(results => results.json())
    },
    getDevelopers(){
      return fetch (`https://api.rawg.io/api/developers&page_size=20`).then(results => results.json())
    },
    getDeveloperGames(id){
      return fetch (`https://api.rawg.io/api/games?developers=${id}`).then(results => results.json())
    },

    getUser(username, password) {
        return fetch (`${remoteURL}/users?username=${username}&password=${password}`).then(result => result.json())
    },
    getUserId(id) {
        return fetch (`${remoteURL}/users/${id}`).then(result => result.json())
    },
    getUsers(){
        return fetch (`${remoteURL}/users`).then(results => results.json())
    },
    createUser(userObject) {
        return fetch(`${remoteURL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        }).then((data) => data.json());
      },
    createGame(gameObject) {
      return fetch(`${remoteURL}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameObject),
      }).then((data => data.json()))
    },
    getUserGame(gameApiId) {
      return fetch(`${remoteURL}/games?gameApiId=${gameApiId}`).then(results => results.json())
    },
    getUserGameProps(gameApiId, userId) {
      return fetch(`${remoteURL}/games?gameApiId=${gameApiId}&userId=${userId}`).then(results => results.json())
    },
    updateUserGame(gameObject, userGameId) {
      return fetch(`${remoteURL}/games/${userGameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObject)
      }).then(results => results.json())
    },
    getFavGames(userId){
      return fetch(`${remoteURL}/games?userId=${userId}&isFavorite=true`).then(results => results.json())
    },
    getWishList(userId){
      return fetch(`${remoteURL}/games?userId=${userId}&isWishList=true`).then(results => results.json())
    },
    getCompList(userId){
      return fetch(`${remoteURL}/games?userId=${userId}&isCompletion=true`).then(results => results.json())
    },
    getGameReviews(gameApiId){
      return fetch(`${remoteURL}/reviews?gameApiId=${gameApiId}`).then(results => results.json())
    },
    createReview(reviewObject){
      return fetch(`${remoteURL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewObject)
      }).then((data => data.json()))
    },
    updateReview(reviewObject){
      return fetch(`${remoteURL}/reviews/${reviewObject.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(reviewObject)
      }).then((results => results.json()))
    },
    deleteReview(id){
      return fetch(`${remoteURL}/reviews/${id}`, {
      method: "DELETE"
      }).then(results => results.json())
    },
    getUserReviews(userId){
      return fetch(`${remoteURL}/reviews?userId=${userId}`).then(results => results.json())
    },
    getReviewId(id){
      return fetch(`${remoteURL}/reviews/${id}`).then(results => results.json())
    }


}