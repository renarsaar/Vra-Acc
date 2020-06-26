import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import FilterContext from "../contexts/FilterContext";

let styles = {
  width: "500px",
  height: "200px",
};

class HotelList extends React.Component {
  static contextType = FilterContext;

  renderFilteredList = (term) => {
    const hotelList = this.props.Hotels;

    // Filter by hotel.type
    const filteredList = hotelList.filter((hotel) =>
      hotel.type.toLowerCase().includes(term.toLowerCase())
    );

    // No matches found on filter
    if (filteredList.length === 0) {
      return (
        <div className="search-nomatch">
          <h1>Sorry :(</h1>
          <p>
            No matches for <code>{term}</code>
          </p>
          <p>Please try again.</p>
        </div>
      );
    }

    // Pass array to renderList
    return this.renderList(filteredList);
  };

  renderList = (hotelList) => {
    // Map array and return hotel details
    return hotelList.map((hotel) => {
      return (
        <div className="hotel-item" key={hotel.adr}>
          <div className="hotel-item-info">
            <Link
              className="hotel-item-info-about"
              to={{
                pathname: "/vraa/hotel/",
                state: {
                  hotelDetails: hotel,
                },
              }}
            >
              <div className="location">
                <h4 className="txt-md">{hotel.type}</h4>
                <h3>
                  {hotel.adr}. {hotel.title}
                </h3>
              </div>
              <div className="review">
                <span className="star">&#9733;</span>
                <p>{hotel.rating}</p>
                <span className="txt-sm">({hotel.reviews})</span>
              </div>
            </Link>
            <div className="txt-sm hotel-item-info-rooms">
              <p>
                {hotel.beds} {hotel.beds > 1 ? "Beds" : "Bed"}
                <span>&#9900;</span>
              </p>
              <p>
                {hotel.bath} {hotel.bath > 1 ? "Baths" : "Bath"}
                <span>&#9900;</span>
              </p>
              <p>
                {hotel.guests} {hotel.guests > 1 ? "Guests" : "Guest"}
              </p>
            </div>
            <div className="hotel-item-info-price">
              <span>€{hotel.price}</span> / night
            </div>
          </div>
          <div className="img" style={styles}>
            <Carousel showStatus={false} swipeable={true} showThumbs={false}>
              {this.renderImages(hotel.images, hotel.adr)}
            </Carousel>
          </div>
        </div>
      );
    });
  };

  renderImages = (images, adrs) => {
    return images.map((image) => {
      return (
        <div key={adrs}>
          <img alt={adrs} src={"." + image}></img>
        </div>
      );
    });
  };

  render() {
    // Input term from Context
    const filterTerm = this.context.term;
    if (filterTerm) {
      return (
        <div className="hotel-list">{this.renderFilteredList(filterTerm)}</div>
      );
    }

    return (
      <div className="hotel-list">{this.renderList(this.props.Hotels)}</div>
    );
  }
}

export default HotelList;
