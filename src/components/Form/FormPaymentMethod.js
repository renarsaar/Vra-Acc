import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

export default function FormPaymentMethod({ showHideClassName, nextStep, prevStep, handleChange, handleClose, values, errors }) {
  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className="modal-main">
        <button className="close-modal" onClick={handleClose}></button>
        <div className="progress-container">
          <ProgressBar values={values} errors={errors} />
          <div className="progress-step">5</div>
          <div className="progress-step">6</div>
        </div>

        <h1>Select Your Payment Mehtod</h1>
        <div className="payment-method">
          <div onClick={handleChange('credit')} className={values.paymentMethod === 'credit' ? 'card active' : 'card'}>
            <i className="far fa-credit-card fa-3x"></i>
            <p>Pay with Credit Card</p>
          </div>

          <div onClick={handleChange('paypal')} className={values.paymentMethod === 'paypal' ? 'card active' : 'card'}>
            <i className="fab fa-paypal fa-3x"></i>
            <p>Pay with PayPal</p>
          </div>

          <button onClick={prevStep}>Go Back</button>
          <button onClick={nextStep}>Continue</button>
        </div>
      </div>
    </div >,
    document.getElementById('modal')
  )
}
