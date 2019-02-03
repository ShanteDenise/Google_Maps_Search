import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import LeadPhoto from "./components/LeadPhoto";


const API_KEY = `${process.env.REACT_APP_GOOGLE_MAP}`
const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`
const CLIENT_SECRET= `${process.env.REACT_APP_CLIENT_SECRET}`

class App extends Component {
  state = {
    venues: []
  };

  renderMap = () => {
    Script(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  getVenues = (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_secret: `${CLIENT_SECRET}`,
      client_id: `${CLIENT_ID}`,
      query: query,
      near: location,
      v: "20182507"
    };
    

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            //After getting the response render the Map
            venues: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
      
  };

  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.753746, lng: -84.38633 },
      zoom: 8
    });
    //Info Window
    var infowindow = new window.google.maps.InfoWindow();

    //Loop through map venues and display content requested
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`;
      var contentAddress = `${myVenue.venue.location.address}`;
      var contentPhoto = `${myVenue.venue.photos[0]}`;
      console.log(myVenue)

      //Create a Marker
    var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng,
          animation: window.google.maps.Animation.DROP
        },
        map: map,
        title: myVenue.venue.name
      });

      //On Click Open info Window
      marker.addListener("click", function() {
        //Change content

        infowindow.setContent(contentString + " " + contentAddress);
        infowindow.open(map, marker);
      });
    });
  };

  render() {
    return (
      <main>
        <NavBar />
        <SearchBar getVenues={this.getVenues} />
       
        {this.state.venues.length === 0 ? (
          <LeadPhoto/>
        ) : (
          <div className="container img-fluid">
            <div id="map-address">
              <ul>
                {/* id, name, location, categories, photos, venuePage} */}
                {this.state.venues.map((myVenue, index) => (
                  <li key={index} className="list-group-item">
                    <div className="flexed">
                      <div>
                        <div className="name">{myVenue.venue.name} </div>
                        {myVenue.venue.location.address} {' '}
                        {myVenue.venue.location.city} {' '}
                        {myVenue.venue.location.state}  
                        <br />
                        
                    <hr/>


                        <br />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>{" "}
            <div id="map" />
          </div>
        )}
      </main>
    );
  }
}
//Select first script tag
function Script(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
