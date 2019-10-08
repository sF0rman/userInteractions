import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './Swipe.css';

const Swipe = ({
  verticalSwipe = false,
  coordinateListener,
  swipeListener,
  children = null,
  captureMouse = false,
  immediateResponse = true,
  useTimer = false,
  timerListener,
  timerDelay = 600,
  vibrateTime = 50,
}) => {

  const [direction, setDirection] = useState('none');
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  Swipe.propTypes = {
    verticalSwipe: PropTypes.bool,
    coordinateListener: PropTypes.func.isRequired,
    swipeListener: PropTypes.func.isRequired,
    useInterval: PropTypes.bool,
    captureMouse: PropTypes.bool,
    immediateResponse: PropTypes.bool,
    useTimer: PropTypes.bool,
    timerListener: PropTypes.func,
    timerDelay: PropTypes.number,
    vibrateTime: PropTypes.number,
  };

  useEffect(() => {
    let id;
    if (isSwiping && useTimer) {
      id = setInterval(() => {
        window.navigator.vibrate(vibrateTime);
        timerListener(direction);
      }, timerDelay)
    }
    return () => clearInterval(id);
  });

  // Handle touches
  const ots = e => {
    setStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const otm = e => {
    let horizontal = (e.touches[0].clientX - startX).toFixed(0);
    let vertical = (e.touches[0].clientY - startY).toFixed(0);
    swipeCalculation(horizontal, vertical);
  };

  const ote = e => {
    setEnd();
  };

  // Handle mouse
  const omd = e => {
    setMouseDown(true);
    setStart(e.clientX, e.clientY);
  };

  const omm = e => {
    if (mouseDown) {
      let horizontal = (e.clientX - startX).toFixed(0);
      let vertical = (e.clientY - startY).toFixed(0);
      swipeCalculation(horizontal, vertical);
    }
  };

  const omu = e => {
    setMouseDown(false);
    setEnd()
  };

  const oml = e => {
    setMouseDown(false);
    setEnd();
  };

  // Store start
  const setStart = (h, v) => {
    setIsSwiping(true);
    setStartX(h);
    setStartY(v);
    setDirection('click');
  }
  const setEnd = () => {
    setIsSwiping(false);
    swipeListener(direction);
    coordinateListener([0, 0])
  }

  // Calculate movement
  const swipeCalculation = (x, y) => {
    coordinateListener([x, y]);

    //Identify direction of swipe
    if (verticalSwipe && Math.abs(y) > Math.abs(x)) {
      (y > 0) ? setDirection(direction => 'down') : setDirection(direction => 'up');
    } else {
      (x > 0) ? setDirection(direction => 'right') : setDirection(direction => 'left');
    }
    immediateResponse && swipeListener(direction);
  };

  return (
    <div className='swipe'
      onTouchStart={(e) => ots(e)}
      onTouchMove={(e) => otm(e)}
      onTouchEnd={(e) => ote(e)}
      style={{touchAction: 'none'}}
      onMouseDown={captureMouse ? ((e) => omd(e)) : undefined}
      onMouseMove={captureMouse ? ((e) => omm(e)) : undefined}
      onMouseUp={captureMouse ? ((e) => omu(e)) : undefined}
      onMouseLeave={captureMouse ? ((e) => oml(e)) : undefined}>
      {children}
    </div >
  )
}

export default Swipe;