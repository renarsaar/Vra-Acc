import React from "react";
import ReactDOM from "react-dom";

import Field from "./Field";
import Button from "./Button";

class Modal extends React.Component {
  state = {
    err: "",
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
  };

  // Set state on input change, validation
  formChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });

    // Regex test name
    if (name === "name" || name === "holder") {
      if (!val.match(/^[a-zöäüõ\s]{0,}$/gi)) {
        this.setState({ err: "Please enter a valid name." });
      } else {
        this.setState({ err: "" });
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

  render() {
    // Show-Hide modal classes
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";

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
          <div className="red error-message">
            {`${this.state.err ? this.state.err : ""}`}
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
                onChange={this.formChange}
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
                onChange={this.formChange}
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
            clickEvent={(e) => console.log(e.target)}
            text="Confirm and Pay"
          />
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default Modal;
