import React, {useState} from 'react';
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import NavBar from "./components/nav/NavBar"


const App = (props) => {
  //Returns true or false
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  //Set to value of isAuthenticated / true or false
  const [hasUser, setHasUser] = useState(isAuthenticated());
  const [userId, setUserId] = useState()
  //Adding user to Session Storage setHasUser
  const setUser = user => {
    sessionStorage.setItem("credentials", parseInt(user.id));
    console.log(user.id)
    setUserId(user.id)
    setHasUser(isAuthenticated());
  };
  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
  }

  return(
    <>
    <NavBar userId={userId} hasUser={hasUser} setUser={setUser} clearUser={clearUser}/>
    <ApplicationViews userId={userId} hasUser={hasUser} setUser={setUser}/>    
    </>
  )
}

export default App;
