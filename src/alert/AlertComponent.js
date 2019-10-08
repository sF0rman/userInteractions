import React, { useState } from 'react';
import AlertBox from './AlertBox';

const AlertComponenet = () => {
  const [alert, setAlert] = useState(false);
  const [swipeResult, setSwipeResult] = useState('none');

  const [useSound, setUseSound] = useState(false);
  const [useVoice, setUseVoice] = useState(false);

  const alertListener = (r, time) => {
    if (r) {
      // Do something if accepted
      setSwipeResult('Accepted');
    } else {
      // Do something if declined
      setSwipeResult('Cancelled');
    }
    console.log(r);

    // Remove alert after animation
    setTimeout(() => {
      setAlert(false);
    }, time);
  }

  const handleClick = () => {
    setAlert(true);
  }

  const toggleSound = () => {
    useSound ? setUseSound(false) : setUseSound(true);
  }

  const toggleVoice = () => {
    useVoice ? setUseVoice(false) : setUseVoice(true);
  }

  return (
    <div id='alertComponent'>
        <h1>AlertBox</h1>

        <div className="grid-3-w">
          <button className={useSound ? 'greenBtn' : 'redBtn'} onClick={toggleSound}>Use Sound</button>
          <button className={useVoice ? 'greenBtn' : 'redBtn'} onClick={toggleVoice}>Use Voice</button>
        </div>

        {alert && <AlertBox onResult={alertListener} useSound={useSound} useVoice={useVoice} />}
        <button className='blueBtn' onClick={handleClick}>Show alert demo</button>
        <p>{(swipeResult === 'none') ? 'Show alert and respond to test alertbox. Touch devies allow swiping!' : 'Result: ' + swipeResult}</p>
    </div>
  )
}

export default AlertComponenet;