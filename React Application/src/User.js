import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

class User extends Component {
    
  constructor(props) {
      super(props);
    //let user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    };
  }

  render() {
    return (
      <div className="User pad">
        <h4 className="pad">Profile</h4>
        <Container>
          <Row className="pad">
            <Col>Name:</Col>
            <Col>{this.state.user.name}</Col>
          </Row>
          <Row className="pad">
            <Col>Email:</Col>
            <Col>{this.state.user.email}</Col>
          </Row>
          <Row className="pad">
            <Col>Role:</Col>
            <Col>{this.state.user.role}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default User;
