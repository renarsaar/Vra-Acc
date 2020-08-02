import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

export default function Confirm({
  showHideClassName, nextStep, prevStep, handleClose, values, errors,
}) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    // Validate forms inputs are filled out
    Object.values(values).forEach((val) => {
      val === '' && (setValid(false));
    });

    // Validate form errors are empty
    Object.values(errors).forEach((err) => {
      err !== '' && (setValid(false));
    });

    return () => {
      setValid(false);
    };
  });

  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className="modal-main">
        <button type="button" className="close-modal" onClick={handleClose} />
        <div className="progress-container">
          <ProgressBar values={values} errors={errors} />
          <div className="progress-step">5</div>
          <div className="progress-step">6</div>
        </div>

        <div className="confirm">
          <ul>
            <li>Location: <span>{values.location}&#40;{values.title}&#41;</span></li>
            <li>Name: <span>{values.fullName}</span></li>
            <li>Email: <span>{values.email}</span></li>
            <li>Number of Guests: <span>{values.guests}</span></li>
            <li>Check In Date: <span>{values.checkIn}</span></li>
            <li>Check out Date: <span>{values.checkOut}</span></li>
            <li>Price: <span>{values.price}&euro;</span></li>
          </ul>

          <div className="step">
            <button type="button" onClick={prevStep}>Go Back</button>
            <button
              type="submit"
              className={!valid ? 'invalid' : 'valid'}
              disabled={!valid ? 'disabled' : ''}
              onClick={nextStep}
            >
              Confirm &amp; pay
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
