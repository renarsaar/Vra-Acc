import React from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";

import HotelList from "./HotelList";

const mapStyles = {
  width: "40%",
  height: "90%",
};

let markerMapStyles = {
  width: "300px",
  height: "85px",
  marginBottom: "117px",
};

let infoStyles = {
  width: "500px",
  height: "200px",
};

class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    hotels: [
      {
        id: 1,
        lat: 59.442388,
        lng: 24.728412,
        adr: "Graniidi 2",
        title: "City Center Superb Studio",
        reviews: 223,
        rating: 4.79,
        guests: 4,
        beds: 2,
        bath: 1,
        type: "Entire apartment",
        price: 195,
        images: ["./img/1.jpg", "./img/3.jpg", "./img/8.jpg", "./img/12.jpg"],
        other: [
          "Free parking",
          "Kitchen",
          "Wifi",
          "Washer",
          "Hangers",
          "Heating",
          "Animals allowed",
          "Hair fryer",
        ],
      },
      {
        id: 2,
        lat: 59.435558,
        lng: 24.765397,
        adr: "Raua 2",
        title: "Bright, big and quiet house",
        reviews: 143,
        rating: 4.22,
        guests: 3,
        beds: 2,
        bath: 1,
        type: "Entire house",
        price: 71,
        images: ["./img/2.jpg", "./img/6.jpg", "./img/7.jpg", "./img/11.jpg"],
        other: ["Kitchen", "Wifi", "Washer", "Hangers", "Heating"],
      },
      {
        id: 3,
        lat: 59.451524,
        lng: 24.732668,
        adr: "Staapli 3",
        title: "Quiet, cozy room",
        reviews: 98,
        rating: 4.19,
        guests: 6,
        beds: 3,
        bath: 2,
        type: "Private room",
        price: 44,
        images: ["./img/5.jpg", "./img/13.jpg", "./img/14.jpg", "./img/15.jpg"],
        other: ["Free parking", "Wifi", "Washer", "Heating"],
      },
      {
        id: 4,
        lat: 59.415933,
        lng: 24.730241,
        adr: "Endla 22",
        title: "Twin rooms with shared bathroom",
        reviews: 312,
        rating: 4.54,
        guests: 2,
        beds: 1,
        bath: 1,
        type: "Hostel beds",
        price: 49,
        images: ["./img/4.jpg", "./img/9.jpg", "./img/10.jpg", "./img/16.jpg"],
        other: ["Free parking", "Wifi"],
      },
    ],
  };

  // Marker events
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = () => {
    // Clear Marker on Map click
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
      });
    }
  };

  displayMarkers = () => {
    return this.state.hotels.map((hotel, index) => {
      return (
        <Marker
          icon={"./img/png/Group 1.png"}
          key={index}
          id={index}
          title={hotel.adr}
          position={{
            lat: hotel.lat,
            lng: hotel.lng,
          }}
          onClick={this.onMarkerClick}
          label={"€" + hotel.price.toString()}
          //
          // Content of the infoWindow
          infoWindow={
            <div>
              <div className="img" style={markerMapStyles}>
                <img alt={hotel.adr} src={hotel.images[0]}></img>
              </div>
              <div className="display-flex-marker">
                <div>€{hotel.price} / night</div>
                <div className="flex">
                  <span className="star">&#9733;</span>
                  <p>{hotel.rating}</p>
                  <span className="txt-sm">({hotel.reviews})</span>
                </div>
              </div>

              <h5>{hotel.adr}</h5>
              <h6>{hotel.title}</h6>
            </div>
          }
        ></Marker>
      );
    });
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControlOptions={{
            position: this.props.google.maps.ControlPosition.TOP_LEFT,
          }}
          zoom={13}
          style={mapStyles}
          initialCenter={{ lat: 59.437, lng: 24.753 }}
          onClick={this.onMapClicked}
        >
          {this.displayMarkers()}
          <InfoWindow
            style={infoStyles}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.infoWindow}</h1>
            </div>
          </InfoWindow>
        </Map>
        <HotelList Hotels={this.state.hotels} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBHdU__81BSA5DomC3pSQ2ruurRy7pIkfk",
})(MapContainer);
