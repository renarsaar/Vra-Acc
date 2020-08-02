import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

export default function FormPaymentDetails({ showHideClassName, nextStep, prevStep, handleClose, handleChange, handleValidation, values, errors }) {
  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className="modal-main">
        <button className="close-modal" onClick={handleClose}></button>
        <div className="progress-container">
          <ProgressBar values={values} errors={errors} />
          <div className="progress-step">5</div>
          <div className="progress-step">6</div>
        </div>

        <form>
          <h3 className="price">Price: {values.price} €</h3>
          <label htmlFor="expiry">
            Cardholder Name<span className="isrequired">*</span>
            <p className="form-error">{errors.cardHolder ? errors.cardHolder : ''}</p>
          </label>
          <input
            className={errors.cardHolder ? 'error-border' : ''}
            type="text"
            name="cardHolder"
            value={values.cardHolder}
            onChange={handleChange}
            onBlur={handleValidation}
            placeholder="e.g. John Doe"
          />

          <label htmlFor="expiry">
            Card Number<span className="isrequired">*</span>
            <p className="form-error">{errors.cardNumber ? errors.cardNumber : ''}</p>
          </label>
          <input
            className={errors.cardNumber ? 'error-border' : ''}
            type="text"
            name="cardNumber"
            maxLength="16"
            value={values.cardNumber}
            onChange={handleChange}
            onBlur={handleValidation}
            placeholder="xxxx-xxxx-xxxx-xxxx"
          />

          <label htmlFor="expiry">
            Expiry<span className="isrequired">*</span>
            <p className="form-error">{errors.expiryM ? errors.expiryM : errors.expiryY ? errors.expiryY : ''}</p>
          </label>
          <div className="expiry">
            <input
              className={errors.expiryM ? 'error-border' : ''}
              type="text"
              name="expiryM"
              maxLength="2"
              value={values.expiryM}
              onChange={handleChange}
              onBlur={handleValidation}
              placeholder="MM"
            />
            <input
              className={errors.expiryY ? 'error-border' : ''}
              type="text"
              name="expiryY"
              maxLength="4"
              value={values.expiryY}
              onChange={handleChange}
              onBlur={handleValidation}
              placeholder="YYYY"
            />
          </div>

          <label htmlFor="expiry">
            CVV/CVC<span className="isrequired">*</span>
            <p className="form-error">{errors.cvv ? errors.cvv : ''}</p>
          </label>
          <input
            className={errors.cvv ? 'error-border' : ''}
            type="text"
            name="cvv"
            maxLength="4"
            value={values.cvv}
            onChange={handleChange}
            onBlur={handleValidation}
            placeholder="CVV/CVC"
          />
          <div className="step">
            <button onClick={prevStep}>Go Back</button>
            <button onClick={nextStep}>Continue</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  )
}
