import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";

const imgStyle = {
    height: 60,
    right: 150

}

export default class NavBar extends Component {
  
  render() {
    return (
      <div>
        <Navbar class="teal" brand="Search Places" left> 
        </Navbar>
      </div>
    );
  }
}
