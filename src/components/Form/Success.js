import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function Success({ showHideClassName, values, errors }) {
  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="success">
          <div className="progress-container">
            <ProgressBar values={values} errors={errors} />
            <div className="progress-step finished">5</div>
            <div className="progress-step finished">6</div>
          </div>
          <h1>
            Success
          </h1>
          <h4>
            Thank you!
            You will recieve a confirmation Email shortly.
          </h4>
          <Link to="/" className="step">
            <button type="button">Back home</button>
          </Link>
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
