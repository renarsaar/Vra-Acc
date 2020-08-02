import React from 'react';

export default function ProgressBar({ values, errors }) {
  // Handle class names
  function handleClassNames(valueArr) {
    // Check if all values empty and no errors
    let finished = !valueArr.map((val) => values[val] !== '' && errors[val] === '').includes(false);

    // Check if value has no error
    let error = valueArr.map((val) => errors[val] !== '').includes(true);

    if (error) finished = false;
    if (finished) error = false;

    if (finished) return 'progress-step finished';
    if (error) return 'progress-step error';
    return 'progress-step';
  }

  return (
    <>
      <div className={handleClassNames(['fullName', 'email', 'guests'])}>1</div>
      <div className={handleClassNames(['checkIn', 'checkOut'])}>2</div>
      <div className={handleClassNames(['paymentMethod'])}>3</div>
      <div className={handleClassNames(['cardHolder', 'cardNumber', 'expiryM', 'expiryY', 'cvv'])}>4</div>
    </>
  )
}
