import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import Field from "./Field";
import Button from "./Button";

let nameErr = "";
let holderErr = "";
let submitErr = "";
let dateErr = "";
let price = 0;

class Modal extends React.Component {
  state = {
    name: "",
    email: "",
    guests: null,
    checkin: "",
    checkout: "",
    payment: "",
    holder: "",
    cardnumber: null,
    expiryM: null,
    expiryY: null,
    cvv: null,
    submit: "fail",
  };

  componentWillUnmount() {
    // Clear errors and price
    price = 0;
    submitErr = "";
    dateErr = "";
  }

  // Set state on input change, validation
  formChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });

    // Regex test name
    if (name === "name" || name === "holder") {
      if (!val.match(/^[a-zöäüõ\s]{0,}$/gi)) {
        if (name === "name") nameErr = "Please enter a valid name.";
        if (name === "holder") holderErr = "Please enter a valid name.";

        // Clear submitErr
        submitErr = "";
      } else {
        if (name === "name") nameErr = "";
        if (name === "holder") holderErr = "";

        submitErr = "";
      }
    }
  };

  // Restrict past dates
  minDate = () => {
    const date = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(date);

    return `${year}-${month}-${day}`;
  };

  // Calculate price based on Check-in/out
  calculatePrice = () => {
    // Calculate price on Check-out select
    if (this.state.checkin) {
      const checkInDate = new Date(this.state.checkin);
      const checkOutDate = new Date(this.state.checkout);

      // Get difference in days
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Check If Check-in is in past
      if (checkInDate > checkOutDate) {
        dateErr = "Please check your dates.";
      } else {
        dateErr = "";
      }

      // Calc new price
      const newPrice = diffDays * this.props.price * this.state.guests;

      // Set new price
      price = newPrice;
    }
  };

  // Submit form event
  submitForm = () => {
    const checkInDate = new Date(this.state.checkin);
    const checkOutDate = new Date(this.state.checkout);

    if (
      // If array full of form values has no empty values and no errors exists
      !Object.values(this.state).includes(null) &&
      !Object.values(this.state).includes("") &&
      nameErr === "" &&
      holderErr === "" &&
      dateErr === ""
    ) {
      this.setState({ submit: "pass" });
    } else {
      submitErr = "Please check your fields.";
      this.setState({ submit: "fail" });
    }
  };

  // Render content on payment form success
  renderSpinner() {
    // Change loading to success
    setTimeout(() => {
      document.getElementById("spinner").src = "/gif/success.gif";

      // Change success gif to text
      setTimeout(() => {
        document.getElementById("spinner").classList.add("display-none");

        document
          .getElementById("spinner-content")
          .classList.remove("display-none");
      }, 2000);
    }, 2000);

    clearTimeout();
  }

  render() {
    // Calculate price on render.
    this.calculatePrice();

    // Show-Hide modal classes
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";

    // If form submitted
    if (this.state.submit === "pass") {
      return (
        <div className={showHideClassName}>
          <div className="modal-main">
            {/* Close Modal */}
            <Button
              btnClass="modal-btn"
              clickEvent={this.props.handleClose}
              text="Close"
            />

            <div onLoad={this.renderSpinner()} className="spinner">
              <div
                className="spinner-content display-none"
                id="spinner-content"
              >
                <h1>Awesome!</h1>
                <p>Your booking has been confirmed.</p>
                <p>Check you email for details.</p>
                <Link to="/">
                  <button>OK</button>
                </Link>
              </div>
              <img alt="spinner" id="spinner" src="./gif/loading.gif"></img>
            </div>
          </div>
        </div>
      );
    }

    // Form
    return ReactDOM.createPortal(
      <div className={showHideClassName}>
        <div className="modal-main">
          {/* Close Modal */}
          <Button
            btnClass="modal-btn"
            clickEvent={this.props.handleClose}
            text="Close"
          />

          {/* Error Message */}
          <div className="red error-message">{`${
            // Output all errors
            nameErr
              ? nameErr
              : holderErr
              ? holderErr
              : submitErr
              ? submitErr
              : dateErr
              ? dateErr
              : ""
          }`}</div>

          {/* Price */}
          <div className="price">
            {`${
              price > 0 && !isNaN(price) && !dateErr ? `Price: ${price} €` : ""
            }`}
          </div>

          <form>
            {/* Left side */}
            <div className="res-details">
              {/* Full name  */}
              <Field
                name="name"
                iClassName="fa fa-user"
                text="Full Name"
                type="text"
                onFieldChange={this.formChange}
              />

              {/* Email */}
              <Field
                name="email"
                iClassName="fa fa-envelope"
                text="Email"
                type="email"
                onFieldChange={this.formChange}
              />

              {/* Guests */}
              <Field
                name="guests"
                iClassName="fa fa-users"
                text="Guests"
                type="number"
                min="1"
                onFieldChange={this.formChange}
              />

              {/* Check-in */}
              <label htmlFor="dates">
                <i className="far fa-calendar-alt"></i>
                Dates <span className="isrequired">*</span>
              </label>
              <input
                type="text"
                onFocus={() =>
                  (document.getElementById("checkin").type = "date")
                }
                onChange={(e) => {
                  this.formChange(e);
                  this.calculatePrice();
                }}
                min={this.minDate()}
                id="checkin"
                name="checkin"
                placeholder="Check In Date"
              />
              {/* Check-out */}
              <input
                type="text"
                onFocus={() =>
                  (document.getElementById("checkout").type = "date")
                }
                onChange={(e) => {
                  this.formChange(e);
                  this.calculatePrice();
                }}
                min={this.minDate()}
                id="checkout"
                name="checkout"
                placeholder="Check Out Date"
              />
            </div>

            {/* Right Side */}
            <div className="res-payment">
              {/* Paypal card */}
              <div className="card paypal">
                <div className="left">
                  <input
                    type="radio"
                    id="pp"
                    name="payment"
                    value="Paypal"
                    onChange={this.formChange}
                  />
                  <div className="radio"></div>
                  <label htmlFor="pp">Paypal</label>
                </div>
                <div className="right">
                  <i className="fab fa-cc-paypal dark-blue"></i>
                </div>
              </div>

              {/* Credit card */}
              <div className="card credit">
                <div className="left">
                  <input
                    type="radio"
                    id="cd"
                    name="payment"
                    value="Credit Card"
                    onChange={this.formChange}
                  />
                  <div className="radio"></div>
                  <label htmlFor="cd">Debit/Credit Card</label>
                </div>
                <div className="right">
                  <i className="fa fa-cc-visa navy"></i>
                  <i className="fa fa-cc-amex blue"></i>
                  <i className="fa fa-cc-mastercard red"></i>
                </div>
              </div>

              {/* Card Holder */}
              <div className="card holder">
                <div className="info">
                  <Field
                    name="holder"
                    text="Card holder"
                    type="text"
                    onFieldChange={this.formChange}
                  />
                </div>
              </div>

              {/* Card Number */}
              <div className="card card-number">
                <div className="info">
                  <Field
                    name="cardnumber"
                    text="Card number"
                    type="tel"
                    max="16"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    onFieldChange={this.formChange}
                  />
                </div>
              </div>

              <div className="card-details">
                <div className="left">
                  {/* Expiry */}
                  <label htmlFor="expiry">
                    Expiry <span className="isrequired">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength="2"
                    id="expiryM"
                    name="expiryM"
                    placeholder="MM"
                    onChange={this.formChange}
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxLength="4"
                    id="expiryY"
                    name="expiryY"
                    placeholder="YYYY"
                    onChange={this.formChange}
                  />
                </div>

                {/* CVC */}
                <div className="right">
                  <Field
                    name="cvv"
                    text="CVC/CVV"
                    type="text"
                    max="4"
                    placeholder="123"
                    onFieldChange={this.formChange}
                  />
                </div>
              </div>
            </div>
          </form>

          <Button
            btnClass="pay-btn"
            type="submit"
            text="Confirm and Pay"
            clickEvent={this.submitForm}
          />
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default Modal;
