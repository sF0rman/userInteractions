import React, { useState } from 'react';

import Gyro from './Gyroscope';

const GyroCompoenent = () => {
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [spin, setSpin] = useState(0);

  const gyroListener = (r, t, s) => {
    // Do something with values: rotation, tilt, spin
    setRotation(r);
    setTilt(t);
    setSpin(s);
  }

  return (
    <div className='container'>
      <h1>GyroComponent</h1>
      <p>Rotate: {rotation}<br />
        Tilt: {tilt}<br />
        Spin: {spin}</p>
      <Gyro listener={gyroListener} />
    </div>
  )
}

export default GyroCompoenent;