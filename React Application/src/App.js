
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import './App.css';
import ReactDOM from 'react-dom';
import Home from './Home';
import User from './User';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var data={
      email: event.target[0].value,
      password: event.target[1].value
      }
      const response = await axios.post(
      'http://localhost:8000/ms/v10/auth/login',
      data,
      { headers: { 'Content-Type': 'application/json' } }
      ).then(response=>{

        if(response.data){
          var user=response.data;
          if(user.role=="EMPLOYEE"){
          // this.setState({ data: response.data })
         
          localStorage.setItem("user",JSON.stringify(user));
          ReactDOM.render(<User />, document.getElementById('root'));
          }else{
            
          // this.setState({ data: response.data })
          localStorage.setItem("user",JSON.stringify(user));
          ReactDOM.render(<Home />, document.getElementById('root'));
          }
        }else{
          alert("Invalid Credentials");
         
        }

      }).catch(
        (err)=>{
          alert("Invalid Credentials");
        
        }
      )
    
 

    // console.log("data")
    // ReactDOM.render(<Home />, document.getElementById('root'));
  }
  return (
    <div className="Login">
    <form onSubmit={handleSubmit}>
      <FormGroup controlId="email" size="large">
        <FormLabel >Email</FormLabel >
        <FormControl
          autoFocus
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="password" size="large">
        <FormLabel >Password</FormLabel >
        <FormControl
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </FormGroup>
      <Button block size="large" disabled={!validateForm()} type="submit" >
        Submit
      </Button>
    </form>
  </div>
  );
}

export default App;
// disabled={!validateForm()}