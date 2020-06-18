const remoteURL = "http://localhost:5002"

export default {

    getAll() {
        return fetch ('https://api.rawg.io/api/games').then(result => result.json())
    },
    get(id){
      return fetch (`https://api.rawg.io/api/games/${id}`).then(result => result.json())
    },
    getMovie(id){
      return fetch (`https://api.rawg.io/api/games/${id}/movies`).then(result => result.json())
    },

    getUser(username, password) {
        return fetch (`${remoteURL}/users?username=${username}&password=${password}`).then(result => result.json())
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
      return fetch(`${remoteURL}/games?gameApiId=${gameApiId}`).then(result => result.json())
    }

}