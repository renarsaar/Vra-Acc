import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

// Restrict past dates
function minDate() {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [
    { value: month }, ,
    { value: day }, ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${year}-${month}-${day}`;
}

export default function FormDateDetails({
  showHideClassName, nextStep, prevStep, handleClose, handleChange, handleValidation, calculatePrice, values, errors,
}) {
  // Handle form change and calculate price
  function handleDates(e) {
    handleValidation(e);

    calculatePrice();
  }

  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className="modal-main">
        <button type="button" className="close-modal" onClick={handleClose} />
        <div className="progress-container">
          <ProgressBar values={values} errors={errors} />
          <div className="progress-step">5</div>
          <div className="progress-step">6</div>
        </div>

        <form>
          <label htmlFor={values.checkIn}>
            Check In Date
            <span className="isrequired">*</span>
            <p className="form-error">{errors.checkIn ? errors.checkIn : ''}</p>
          </label>
          <input
            className={errors.checkIn ? 'error-border' : ''}
            type="date"
            name="checkIn"
            value={values.checkIn}
            onChange={handleChange}
            onBlur={handleDates}
            min={minDate()}
          />

          <label htmlFor={values.checkOut}>
            Check Out Date
            <span className="isrequired">*</span>
            <p className="form-error">{errors.checkOut ? errors.checkOut : ''}</p>
          </label>
          <input
            className={errors.checkOut ? 'error-border' : ''}
            type="date"
            name="checkOut"
            value={values.checkOut}
            onChange={handleChange}
            onBlur={handleDates}
            min={minDate()}
          />
          <div className="step">
            <button type="button" onClick={prevStep}>Go Back</button>
            <button type="button" onClick={nextStep}>Continue</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
