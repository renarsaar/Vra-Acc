import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

export default function FormPersonalDetails({
  values, handleChange, handleClose, handleValidation, showHideClassName, nextStep, errors,
}) {
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
          <label htmlFor="name">
            Name
            <span className="isrequired">*</span>
            <p className="form-error">{errors.fullName}</p>
          </label>
          <input
            className={errors.fullName ? 'error-border' : ''}
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleValidation}
          />

          <label htmlFor="email">
            Email
            <span className="isrequired">*</span>
            <p className="form-error">{errors.email}</p>
          </label>
          <input
            className={errors.email ? 'error-border' : ''}
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleValidation}
          />

          <label htmlFor="guests">
            Number of guests
            <span className="isrequired">*</span>
            <p className="form-error">{errors.guests}</p>
          </label>
          <input
            className={errors.guests ? 'error-border' : ''}
            type="text"
            name="guests"
            value={values.guests}
            onChange={handleChange}
            onBlur={handleValidation}
          />
          <div className="step">
            <button type="button" onClick={nextStep}>Continue</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
