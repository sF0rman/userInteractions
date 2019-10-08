import React, { useState } from 'react';

import Motion from './Motion';

const MotionCompoenent = () => {
  const [motionX, setMotionX] = useState(0);
  const [motionY, setMotionY] = useState(0);
  const [motionZ, setMotionZ] = useState(0);
  const [shake, setShake] = useState(0);

  const [detectShake, setDetectShake] = useState(false);
  const [useGravity, setUseGravity] = useState(false);

  const motionListener = (x, y, z) => {
    // Do something with values: rotation, tilt, spin
    setMotionX(x);
    setMotionY(y);
    setMotionZ(z);
  }

  const shakeListener = () => {
    setShake(shake + 1);
  }

  const toggleShake = () => {
    detectShake ? setDetectShake(false) : setDetectShake(true);
  }

  const toggleGravity = () => {
    useGravity ? setUseGravity(false) : setUseGravity(true);
  }

  return (
    <div className='container'>
      <h1>MotionComponent</h1>

      <div className="grid-3-w">
        <button className={detectShake ? 'greenBtn' : 'redBtn'} onClick={toggleShake}>Detect shaking</button>
        <button className={useGravity ? 'greenBtn' : 'redBtn'} onClick={toggleGravity}>Use Gravity</button>
      </div>

      <p>X: {motionX}<br />
        Y: {motionY}<br />
        Z: {motionZ}</p>
      <p>Shake times: {shake}</p>

      <Motion
        motionListener={motionListener}
        shakeListener={shakeListener}
        useGravity={useGravity}
        detectShake={detectShake} />
    </div>
  )
}

export default MotionCompoenent;