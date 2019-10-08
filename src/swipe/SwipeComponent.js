import React, { useState } from 'react';

import Swipe from './Swipe';

const SwipeCompoenent = () => {
  const [position, setPosition] = useState([0, 0]);
  const [swipeResult, setSwipeResult] = useState('none');
  const [timerCount, setTimerCount] = useState(0);
  const [clickedId, setClickedId] = useState(0);

  const [useVertical, setUseVertical] = useState(false);
  const [useTimer, setUseTimer] = useState(false);
  const [useMouse, setUseMouse] = useState(false);
  const [useInstant, setUseInstant] = useState(true);

  const positionListener = (p) => {
    setPosition(p);
  }

  const swipeListener = (r) => {
    setSwipeResult(r);
  }

  const timerListener = () => {
    if (swipeResult === "right") {
      setTimerCount(timerCount => timerCount + 1);
    } else if (swipeResult === "left") {
      setTimerCount(timerCount => timerCount - 1);
    }
  }

  const childClick = (e) => {
    setClickedId(e.currentTarget.id);
  }

  const toggleMouse = () => {
    useMouse ? setUseMouse(false) : setUseMouse(true);
  }

  const toggleVertical = () => {
    useVertical ? setUseVertical(false) : setUseVertical(true);
  }

  const toggleTimer = () => {
    useTimer ? setUseTimer(false) : setUseTimer(true);
  }

  const toggleInstant = () => {
    useInstant ? setUseInstant(false) : setUseInstant(true);
  }

  return (
    <div className='container'>
      <h1>SwipeComponent</h1>

      <p>Coordinates: X: {position[0]} Y: {position[1]}<br />
        Returned result: {swipeResult}<br />
        ScrobbleDemo: {timerCount}<br />
        Clicked button: {clickedId}</p>

      <div className="grid-3-w">
        <button className={useMouse ? 'greenBtn' : 'redBtn'} onClick={toggleMouse}>Swipe with Mouse</button>
        <button className={useVertical ? 'greenBtn' : 'redBtn'} onClick={toggleVertical}>Vertical swipe</button>
        <button className={useTimer ? 'greenBtn' : 'redBtn'} onClick={toggleTimer}>Long swipe</button>
        <button className={useInstant ? 'greenBtn' : 'redBtn'} onClick={toggleInstant}>Immediate Result</button>
      </div>

      <Swipe verticalSwipe={useVertical}
        coordinateListener={positionListener}
        swipeListener={swipeListener}
        captureMouse={useMouse}
        immediateResponse={useInstant}
        useTimer={useTimer}
        timerListener={timerListener} >

        <p>Swipe me! Yey</p>
        <button id="1" className='blueBtn' onClick={childClick}>1: Click me</button>
        <button id="2" className='blueBtn' onClick={childClick}>2: Click me</button>

      </Swipe>

    </div>
  )
}

export default SwipeCompoenent;
