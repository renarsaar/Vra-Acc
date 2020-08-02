import React from 'react';

import FormPersonalDetails from './Form/FormPersonalDetails';
import FormDateDetails from './Form/FormDateDetails';
import FormPaymentMethod from './Form/FormPaymentMethod';
import FormPaymentDetails from './Form/FormPaymentDetails';
import Confirm from './Form/Confirm';
import Success from './Form/Success';

const nameRegex = /^[a-zA-Z öäüõÖÄÜÕ]+$/;
const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const cardNumberRegex = /[0-9]{16}/;
const expiryMRegex = /[0-9]{2}/;
const expiryYRegex = /[0-9]{4}/;
const cvvRegex = /[0-9]{3,4}/;

class Modal extends React.Component {
  state = {
    step: 1,
    fullName: '',
    email: '',
    guests: '',
    checkIn: '',
    checkOut: '',
    paymentMethod: '',
    cardHolder: '',
    cardNumber: '',
    expiryM: '',
    expiryY: '',
    cvv: '',
    price: this.props.price,
    location: this.props.location,
    title: this.props.title,
    formErrors: { fullName: '', email: '', guests: '', checkIn: '', checkOut: '', paymentMethod: '', cardHolder: '', cardNumber: '', expiryM: '', expiryY: '', cvv: '' }
  };

  // Clear Form Step
  componentWillUnmount() {
    this.setState({ step: 1 })
  };

  // Proceed to next Step
  nextStep = (e) => {
    e.preventDefault();
    const { step } = this.state;

    this.setState({ step: step + 1 });
  };

  // Go back to previous Step
  prevStep = (e) => {
    e.preventDefault();
    const { step } = this.state;

    this.setState({ step: step - 1 });
  };

  // Handle fields change
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Handle choose payment
  handlePaymentChange = value => e => {
    this.setState({ paymentMethod: value });
  }

  // Calculate price based on dates
  calculatePrice = () => {
    const { formErrors } = this.state;

    if (this.state.checkIn && this.state.checkOut && !formErrors.checkIn && !formErrors.checkOut) {
      const checkInDate = new Date(this.state.checkIn);
      const checkOutDate = new Date(this.state.checkOut);
      const differenceInTime = Math.abs(checkOutDate - checkInDate);
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

      const newPrice = differenceInDays * this.state.price * +this.state.guests;
      this.setState({ price: newPrice });
    }
  }

  // Handle form validation
  handleValidation = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    const checkInDate = new Date(this.state.checkIn);
    const checkOutDate = new Date(this.state.checkOut);

    switch (name) {
      case 'fullName':
        formErrors.fullName = value.length < 3
          ? 'Name must be atleast 3 characters.'
          : !nameRegex.test(value)
            ? 'Invalid name'
            : '';
        break;

      case 'email':
        formErrors.email = value.length < 1
          ? 'Email address is required.'
          : !emailRegex.test(value)
            ? 'Invalid Email address'
            : '';
        break;

      case 'guests':
        formErrors.guests = value === ''
          ? 'Amount of guests is required.'
          : !Number(value)
            ? 'Please insert a number'
            : '';
        break;

      case 'checkIn':
        formErrors.checkIn = value === ''
          ? 'Check in date is required.'
          : checkInDate > checkOutDate
            ? 'Please check your dates'
            : '';
        break;

      case 'checkOut':
        formErrors.checkOut = value === ''
          ? 'Check out date is required.'
          : checkInDate > checkOutDate
            ? 'Please check your dates'
            : '';
        break;

      case 'cardHolder':
        formErrors.cardHolder = value === ''
          ? 'Card holder name is required.'
          : !nameRegex.test(value)
            ? 'Invalid name'
            : '';
        break;

      case 'cardNumber':
        formErrors.cardNumber = value === ''
          ? 'Credit card number is required.'
          : !cardNumberRegex.test(value)
            ? 'Invalid Card number'
            : '';
        break;

      case 'expiryM':
        formErrors.expiryM = value === ''
          ? 'Expiration date is required.'
          : !expiryMRegex.test(value)
            ? 'Invalid expiry date'
            : '';
        break;

      case 'expiryY':
        formErrors.expiryY = value === ''
          ? 'Expiration date is required.'
          : !expiryYRegex.test(value)
            ? 'Invalid expiry date'
            : '';
        break;

      case 'cvv':
        formErrors.cvv = value === ''
          ? 'Cvv code is required'
          : !cvvRegex.test(value)
            ? 'Invalid cvv code'
            : '';
        break;

      default:
        break;
    }

    this.setState({ formErrors });
  }

  render() {
    // Modal classes
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    const { step, formErrors, ...values } = this.state;

    // Multi Step Form
    switch (step) {
      case 1:
        return (
          <FormPersonalDetails
            showHideClassName={showHideClassName}
            nextStep={this.nextStep}
            handleClose={this.props.handleClose}
            handleChange={this.handleChange}
            handleValidation={this.handleValidation}
            values={values}
            errors={formErrors}
          />
        )

      case 2:
        return (
          <FormDateDetails
            showHideClassName={showHideClassName}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleClose={this.props.handleClose}
            handleChange={this.handleChange}
            handleValidation={this.handleValidation}
            calculatePrice={this.calculatePrice}
            values={values}
            errors={formErrors}
          />
        )
      case 3:
        return (
          <FormPaymentMethod
            showHideClassName={showHideClassName}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleClose={this.props.handleClose}
            handleChange={this.handlePaymentChange}
            values={values}
            errors={formErrors}
          />
        )

      case 4:
        return (
          <FormPaymentDetails
            showHideClassName={showHideClassName}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleClose={this.props.handleClose}
            handleChange={this.handleChange}
            handleValidation={this.handleValidation}
            values={values}
            errors={formErrors}
          />
        )

      case 5:
        return (
          <Confirm
            showHideClassName={showHideClassName}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleClose={this.props.handleClose}
            values={values}
            errors={formErrors}
          />
        )

      case 6:
        return (
          <Success
            showHideClassName={showHideClassName}
            values={values}
            errors={formErrors}
          />
        )

      default:
        break;
    }
  }
}

export default Modal;
