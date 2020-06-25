import React from "react";
import Modal from "./Modal";

class HotelItem extends React.Component {
  // Image Arr from props. filterImages()
  state = {
    imgs: this.props.location.state.hotelDetails.images,
    showModal: false,
  };

  // Render whole list to DOM
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
            <h4>Price: €{hotel.price} / night</h4>
          </div>
          <h4>Amenities</h4>
          <ul>{this.renderAmenities(hotel.other)}</ul>
          <div onClick={this.showModal} className="reservation">
            <button>Make a reservation!</button>
          </div>
          <Modal
            price={hotel.price}
            show={this.state.showModal}
            handleClose={this.hideModal}
          ></Modal>
        </div>
        <div className="hotel-images">{this.renderImages(this.state.imgs)}</div>
      </div>
    );
  }

  // Modal events
  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  // Render Amenities & FA icons
  renderAmenities(amenities) {
    return amenities.map((amn) => {
      return amn === "Wifi" ? (
        <li key={amn}>
          <i className="fas fa-wifi" />
          {amn}
        </li>
      ) : amn === "Free parking" ? (
        <li key={amn}>
          <i className="fas fa-parking" />
          {amn}
        </li>
      ) : amn === "Kitchen" ? (
        <li key={amn}>
          <i className="fas fa-utensils" />
          {amn}
        </li>
      ) : amn === "Animals allowed" ? (
        <li key={amn}>
          <i className="fas fa-cat" />
          {amn}
        </li>
      ) : amn === "Heating" ? (
        <li key={amn}>
          <i className="fas fa-temperature-high" />
          {amn}
        </li>
      ) : (
        <li key={amn}>{amn}</li>
      );
    });
  }

  // Render Image section
  renderImages(images) {
    return images.map((img) => {
      return (
        <img
          onClick={() => this.filterImages(img)}
          src={img}
          alt={img}
          key={img}
        />
      );
    });
  }

  // Filter onClick
  filterImages(selectedImage) {
    // Image Elements Arr
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

  render() {
    return <div>{this.renderHotel()}</div>;
  }
}

export default HotelItem;
