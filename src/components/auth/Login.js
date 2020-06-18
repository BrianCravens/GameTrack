import React, { useState } from "react"
import {withRouter} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap'

import GameManager from "../../modules/GameManager"


const Login = props => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    GameManager.getUser(credentials.username, credentials.password).then((user) => {
      if (user.length < 1) 
      {window.alert("Account does not exist")
      }else{
        props.setUser(user[0])
        props.history.push("/games")
      }
    })
  }

  const createUser = (e) => {
    e.preventDefault();
    GameManager.getUsers().then((users) => {
      if (users.find((user) => user.username === credentials.username)) {
        window.alert("Username Already In Use!!!");
      } else if (
        credentials.username === "" ||
        credentials.password === ""
      ) {
        window.alert("Please fill out all fields");
      } else {
        GameManager.createUser(credentials).then((newUser) => {
          props.setUser(newUser[0])
          props.history.push('/games')
          window.alert("Your account has been created!");
        });
      }
    });
    
  }

  return (
      <div>
    <Form onSubmit = {handleLogin}>
    <Form.Group controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control onChange={handleFieldChange} type="username" placeholder="Username" />
    </Form.Group>
  
    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={handleFieldChange} type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    {!props.hasUser && <Button variant="secondary" type="create" onClick={createUser}>
      Create User
    </Button>}
    </Form>
    </div>
  )
  
//   return (
//     <form onSubmit={handleLogin}>
//       <fieldset>
//         <h3>Please sign in</h3>
//         <div className="formgrid">
//           <input onChange={handleFieldChange} type="username"
//             id="username"
//             placeholder="Username"
//             required="" autoFocus="" />
//           <label htmlFor="inputUsername">Username</label>

//           <input onChange={handleFieldChange} type="password"
//             id="password"
//             placeholder="Password"
//             required="" />
//           <label htmlFor="inputPassword">Password</label>
//         </div>
//         <button type="submit">Sign in</button>
//       </fieldset>
//     </form>
//   );

}
export default withRouter(Login)