import React, {useState} from 'react';
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import NavBar from "./components/nav/NavBar"


const App = (props) => {
  //Returns true or false
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  //Set to value of isAuthenticated / true or false
  const [hasUser, setHasUser] = useState(isAuthenticated());
  //Adding user to Session Storage setHasUser
  const setUser = user => {
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };
  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  }

  return(
    <>
    <NavBar hasUser={hasUser} setUser={setUser} clearUser={clearUser}/>
    <ApplicationViews hasUser={hasUser} setUser={setUser}/>    
    </>
  )
}

export default App;
