import {Route, Redirect} from "react-router-dom";
import React from "react";
import GameList from "../components/games/GameList"
import Login from "../components/auth/Login"
import GameDetail from "../components/games/GameDetail"
import Favorites from "../components/games/Favorites"
import WishList from "../components/games/WishList"
import Completions from "../components/games/Completions"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    const userId = props.userId



    return(
        <React.Fragment>
            <Route exact path = "/login" render={(props) => {
               return <Login userId= {userId} setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/games" render={(props) => {
               return <GameList userId= {userId} setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/games/:gameId(\d+)" render={(props) => {
               return <GameDetail  gameId={parseInt(props.match.params.gameId)} userId= {userId} setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/favorites" render={(props) => {
               return <Favorites userId= {userId} setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/wishList" render={(props) => {
               return <WishList userId= {userId} setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/completions" render={(props) => {
               return <Completions userId= {userId} setUser={setUser} {...props}/>
            }}/>
        </React.Fragment>
    )
}
export default ApplicationViews;