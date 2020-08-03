import React from 'react';
import Modal from './Modal';

import FilterContext from '../contexts/FilterContext';

class HotelItem extends React.Component {
  static contextType = FilterContext;
  state = {
    imgs: this.props.location.state.hotelDetails.images,
    showModal: false,
  };

  // Hide searchbar
  componentDidMount() {
    this.context.handleShowSearchBar(false);
  }

  // Show modal
  showModal = () => {
    this.setState({ showModal: true });
  };

  // Hide modal
  hideModal = () => {
    this.setState({ showModal: false });
  };

  // Render Amenities & FA icons
  renderAmenities(amenities) {
    return amenities.map((amenity) => {
      if (amenity === 'Wifi') {
        return (
          <li key={amenity}>
            <i className="fas fa-wifi" />
            {amenity}
          </li>
        );
      }

      if (amenity === 'Free parking') {
        return (
          <li key={amenity}>
            <i className="fas fa-parking" />
            {amenity}
          </li>
        );
      }

      if (amenity === 'Kitchen') {
        return (
          <li key={amenity}>
            <i className="fas fa-utensils" />
            {amenity}
          </li>
        );
      }

      if (amenity === 'Animals allowed') {
        return (
          <li key={amenity}>
            <i className="fas fa-cat" />
            {amenity}
          </li>
        );
      }

      if (amenity === 'Heating') {
        return (
          <li key={amenity}>
            <i className="fas fa-temperature-high" />
            {amenity}
          </li>
        );
      }

      return <li key={amenity}>{amenity}</li>;
    });
  }

  // Filter images order
  filterImages(selectedImage) {
    const imageArr = this.state.imgs;

    // Get the index of selected image
    const selectedIndex = imageArr.findIndex(
      (image) => image === selectedImage
    );

    // Swap state array elements
    const firstArrEl = imageArr[0];
    imageArr[0] = selectedImage;
    imageArr[selectedIndex] = firstArrEl;

    this.setState({ imgs: imageArr });
  }


  // Render Image section
  renderImages(images) {
    return images.map((image) => (
      <img
        onClick={() => this.filterImages(image)}
        src={`..${image}`}
        alt={image}
        key={image}
      />
    ));
  }

  // Rended Content
  renderHotel() {
    const hotel = this.props.location.state.hotelDetails;

    return (
      <div className="hotel">
        <div className="hotel-info">
          <h3>{hotel.title}</h3>
          <div className="location-type">
            <h4>Location: {hotel.adr}</h4>
            <h4>Type: {hotel.type}</h4>
          </div>
          <p>
            {hotel.beds} {hotel.beds > 1 ? "Beds" : "Bed"}
          </p>
          <p>
            {hotel.bath} {hotel.bath > 1 ? "Baths" : "Bath"}
          </p>
          <p>
            {hotel.guests} {hotel.guests > 1 ? "Guests" : "Guest"}
          </p>
          <div className="price-review">
            <p>
              {hotel.reviews} reviews. Rating: {hotel.rating} out of 5.
            </p>
            <h4>Price: &euro;{hotel.price} / night</h4>
          </div>
          <h4>Amenities</h4>
          <ul>
            {this.renderAmenities(hotel.other)}
          </ul>
          <div className="reservation">
            <button type="button" onClick={this.showModal}>Make a reservation!</button>
          </div>
          <Modal
            price={hotel.price}
            location={hotel.adr}
            title={hotel.title}
            show={this.state.showModal}
            handleClose={this.hideModal}
          />
        </div>
        <div className="hotel-images">
          {this.renderImages(this.state.imgs)}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.context);
    return <div>{this.renderHotel()}</div>;
  }
}

export default HotelItem;