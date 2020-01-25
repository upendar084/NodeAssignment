import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import './App.css';

class Home extends Component {
componentWillMount(){
  this.getData();
}
    constructor(props) {
      super(props);
   
    //let user = JSON.parse(localStorage.getItem("user"));
   
    this.state = {
      user: []
    };
 this.getData=this.getData.bind(this);
  }
  getData() {
  axios.get(
      'http://localhost:8000/ms/v10/auth/getAllUsers',
      { headers: { 'Content-Type': 'application/json' } }
      ).then(response=>{
      
        if(response.data){


          var user =response.data
        
          this.setState({user});
        }else{
         
        }

      }).catch(
        (err)=>{

        }
      )
  }
  render() {
    return (
      <div className="User pad"> 
      <h4 className="pad">User Details</h4>
        <Table striped bordered hover >
          <thead>
            <tr>
 
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
           
            {this.state.user.map(this.renderPerson)}
            
            
          </tbody>
        </Table>
      </div>
    );
  }
  renderPerson(person, index) {
    return (
    <tr key={index}>
    <td>{person.name}</td>
    <td>{person.email}</td>
    <td>{person.role}</td>
    </tr>
    )
    }
}

export default Home;
