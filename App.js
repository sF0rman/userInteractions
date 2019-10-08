import React from 'react';

import AlertComponent from './src/alert/AlertComponent';
import GyroComponent from './src/gyro/GyroCompoenent';
import SwipeComponent from './src/swipe/SwipeComponent';
import MotionCompoenent from './src/motion/MotionComponent';


const App = () => {
  return (
    <div className='container' style={{paddingTop: 10+'vh'}}>
      <AlertComponent />
      <GyroComponent />
      <SwipeComponent />
      <MotionCompoenent />
    </div>

  )
}

export default App;