import React, { Component } from 'react'
import {Button, Input, Row } from 'react-materialize'

const Search = {
    height: 60,
    margin: 1,
    
}
const buttonStyle = {
    top: 20,
    height: 50
}



 class SearchBar extends Component {
     state = {
         query: "",
         location: ""
     }

     handleChange = (e) => {   
         this.setState({
            [e.target.name]: e.target.value
         })
     }

     handleSubmit = (e) => {
        e.preventDefault()
        this.props.getVenues(this.state.query, this.state.location)
    }
    
  render() {
    return (
      <div style={Search} className="searchbar_background">
        {/* <p className="title-container__subtitle">
          Find the best places to eat, drink, shop, or visit in any city in the world.
          </p> */}
          <form onSubmit={this.handleSubmit}>
          <Row>
    <Input type="text" 
            placeholder="What would you like to do?" 
            s={4} 
            name="query" 
            value={this.state.query}
            onChange={this.handleChange} />

    <Input placeholder="Where?" 
            s={4} 
            name="location" 
            value={this.state.location}
            onChange={this.handleChange}/>

    <Button className="red" style={buttonStyle} waves='light' >Find Places <i class="material-icons right">search</i></Button>
    

        </Row>
        </form>
      
      </div>
    )
  }
}

export default SearchBar;
