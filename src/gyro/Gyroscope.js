import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Gyroscope = ({listener, children}) => {

  useEffect(() => {
    if(window.DeviceOrientationEvent){
      window.ondeviceorientation = e => handleOrientation(e);
    } else {
      console.log('Device Orientation: Not supported');
    }
  });

  Gyroscope.propTypes = {
    listener: PropTypes.func.isRequired,
  }

  const handleOrientation = (e) => {
    let rotate = e.gamma;
    let tilt = e.beta;
    let spin = e.alpha;
    listener(Math.round(rotate), Math.round(tilt), Math.round(spin));
  };


  return (
    <div className='gyroscope'>
      {children}
    </div>

  )
}

export default Gyroscope;