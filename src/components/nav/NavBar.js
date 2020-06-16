import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup'
import "./NavBar.css"
import Login from '../auth/Login'

const NavBar = (props) => {
    const handleLogout = () => {
        props.clearUser();
        props.history.push('/games');
    }
    return (
        <header>
      <h1 className="site-title">
        Game Track
      </h1>
      <div className="nav-container">
      <nav className="nav-bar">
        <ul className="container">
          <li><Link className="nav-link" to="/games">Games</Link></li>
          <li><Link className="nav-link" to="/developers">Developers</Link></li>
          {props.hasUser?<li><Link className="nav-link" to="/wishList">Wish List</Link></li>: null}
          {props.hasUser?<li><Link className="nav-link" to="/favorites">Favorites</Link></li>: null}
          {props.hasUser?<li><Link className="nav-link" to="/myReviews">My Reviews</Link></li>: null}
          {props.hasUser?<li><Link className="nav-link" to="/completions">Completions</Link></li>: null}
          {props.hasUser?<li><span className="nav-link" onClick={handleLogout}>Logout</span></li>:
            <li><Link className="nav-link" to="/login">Login</Link></li>}
          </ul>
      </nav>
      </div>
    </header>
    )
    
}
export default withRouter(NavBar)