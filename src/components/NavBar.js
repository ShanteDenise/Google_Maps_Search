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
        <Navbar class="red" brand="Going Places" left> 
            <img style={imgStyle} src="https://pngimage.net/wp-content/uploads/2018/06/map-logo-png-9.png"/>

        </Navbar>
      </div>
    );
  }
}
