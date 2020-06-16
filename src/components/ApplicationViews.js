import {Route, Redirect} from "react-router-dom";
import React from "react";
import GameList from "../components/games/GameList"
import Login from "../components/auth/Login"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;



    return(
        <React.Fragment>
            <Route exact path = "/login" render={(props) => {
               return <Login setUser={setUser} {...props}/>
            }}/>
            <Route exact path = "/games" render={(props) => {
               return <GameList setUser={setUser} {...props}/>
            }}/>
        </React.Fragment>
    )
}
export default ApplicationViews;