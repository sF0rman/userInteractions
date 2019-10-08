import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Motion = ({
  useGravity = false,
  detectShake = false,
  shakeThreshold = 15,
  shakeVibrationTime = 50,
  shakeResetTime = 750,
  children = null,
  motionListener,
  shakeListener }) => {

  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [maxZ, setMaxZ] = useState(0);
  const [minX, setMinX] = useState(0);
  const [minY, setMinY] = useState(0);
  const [minZ, setMinZ] = useState(0);
  const [wasShaked, setWasShaked] = useState(false);
  const [shakedTime, setShakeTime] = useState(0);

  Motion.propTypes = {
    useGravity: PropTypes.bool,
    detectShake: PropTypes.bool,
    shakeThreshold: PropTypes.number,
    shakeVibrationTime: PropTypes.number,
    shakeResetTime: PropTypes.number,
    motionListener: PropTypes.func.isRequired,
    shakeListener: PropTypes.func,
  }

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.ondevicemotion = e => handleMotion(e);
    } else {
      console.log('Device Motion: Not supported');
    }
  });

  const handleMotion = (e) => {
    let x = e.acceleration.x;
    let y = e.acceleration.y;
    let z = e.acceleration.z;
    let gravityX = e.accelerationIncludingGravity.x;
    let gravityY = e.accelerationIncludingGravity.y;
    let gravityZ = e.accelerationIncludingGravity.z;

    if (wasShaked) {
      let currentTime = new Date().getTime();
      if(currentTime > shakedTime + shakeResetTime){
        console.log('Can shake again')
        setWasShaked(false);
      }
    } else {
      if (useGravity) {
        detectShake && shakeDetection(gravityX, gravityY, gravityZ, new Date().getTime());
        motionListener(
          Math.round(gravityX),
          Math.round(gravityY),
          Math.round(gravityZ)
        );
      } else {
        detectShake && shakeDetection(x, y, z, new Date().getTime());
        motionListener(
          Math.round(x),
          Math.round(y),
          Math.round(z)
        );
      }
    }
  };

  const shakeDetection = (x, y, z, time) => {
    (x > maxX) && setMaxX(x);
    (x < minX) && setMinX(x);
    (y > maxY) && setMaxY(y);
    (y < minY) && setMinY(y);
    (z > maxZ) && setMaxZ(z);
    (z < minZ) && setMinZ(z);

    // If shake is detected
    if (maxX + minX > shakeThreshold ||
      maxY + minY > shakeThreshold ||
      maxZ + minZ > shakeThreshold) {
      window.navigator.vibrate(shakeVibrationTime)
      setShakeTime(time);
      setWasShaked(true);
      shakeListener();
      resetShake();
    }

  }

  const resetShake = () => {
    // reset values when shake is detected
    setMaxX(0);
    setMinX(0);
    setMaxY(0);
    setMinY(0);
    setMaxZ(0);
    setMinZ(0);
  }


  return (
    <div className='motion'>
      {children}
    </div>
  )
}

export default Motion;