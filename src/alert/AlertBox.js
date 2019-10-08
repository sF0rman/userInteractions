import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import okSound from './sound/okSound.wav';
import noSound from './sound/noSound.wav';

import './alertBox.css';

const AlertBox = ({
  okBtn = 'Ok',
  noBtn = 'Cancel',
  title = 'Alert!',
  msg = 'Template message',
  onResult,
  animationTime = 0.3,
  swipeDistanceFraction = 3,
  useSound = false,
  useVoice = false,
  voiceLanguage = 'en-GB',
}) => {

  AlertBox.propTypes = {
    okBtn: PropTypes.string,
    noBtn: PropTypes.string,
    title: PropTypes.string,
    msg: PropTypes.string,
    animationTime: PropTypes.number,
    swipeDistanceFraction: PropTypes.number,
    onResult: PropTypes.func.isRequired,
    useSound: PropTypes.bool,
    useVoice: PropTypes.bool,
    voiceLanguage: PropTypes.string,
  }

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Cant talk');
    } else {
      console.log('Can use speech');
      if (useVoice) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continious = false;
        recognition.interimResults = false;
        recognition.lang = 'en-GB';
        recognition.start();
        recognition.onresult = (r) => handleSpeech(r);
      }
    }
  })

  const handleSpeech = (r) => {
    let transcript = r.results[0][0].transcript;
    transcript = transcript.toLowerCase();
    if (transcript === 'ok' || transcript === 'yes' || transcript === 'accept') {
      console.log('OK', transcript);
      acceptClicked()
    } else if (transcript === 'no' || transcript === 'cancel' || transcript === 'decline') {
      console.log('No', transcript);
      declinedClicked();
    } else {
      console.log('Transcript:', transcript);
    }
  }

  // Swipe calculations
  const [alertPos, setAlertPos] = useState(0);
  const [alertNew, setAlertNew] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [defalutPos, setDefaultPos] = useState(50 + '%');

  const [okSoundFile] = useState(new Audio(okSound));
  const [noSoundFile] = useState(new Audio(noSound));

  //Make both buttons the same size!
  const yBtn = document.getElementsByClassName('sfAlertAcceptBtn');
  const nBtn = document.getElementsByClassName('sfAlertDeclineBtn');
  const [btnWidth, setButtonWidth] = useState(yBtn.innerWidth + 'px');
  if (nBtn.innerWidth > yBtn.innerWidth) {
    setButtonWidth(nBtn.innerWidth + 'px');
  }

  // Button logic
  const declinedClicked = () => {
    useSound && noSoundFile.play();
    onResult(false, 0);
  }

  const acceptClicked = () => {
    useSound && okSoundFile.play();
    onResult(true, 0)
  }

  // Handle swiping
  const ots = (e) => {
    let alert = document.getElementById('sfAlertBox');
    let start = alert.offsetLeft;

    setPageWidth(window.innerWidth);
    setAlertPos(start);
    setStartPos(e.touches[0].clientX);
    console.log('Start:', startPos);
  }

  const otm = (e) => {
    setDistance(e.touches[0].clientX - startPos);
    setAlertNew(alertPos + distance);
    setIsSwiping(true);
  }

  const ote = (e) => {
    setIsSwiping(false);
    if (distance > (pageWidth / swipeDistanceFraction)) {
      useSound && okSoundFile.play();
      setDefaultPos(pageWidth + 500);
      onResult(true, animationTime * 1000);
    } else if (distance < ((pageWidth / swipeDistanceFraction) * -1)) {
      useSound && noSoundFile.play();
      setDefaultPos(0 - 500)
      onResult(false, animationTime * 1000)
    }
  }


  return (
    <div className="sfAlertWrapper">
      <div className="sfAlertBox" id="sfAlertBox"
        onTouchStart={e => ots(e)}
        onTouchMove={e => otm(e)}
        onTouchEnd={e => ote(e)}
        style={
          isSwiping ? {
            transition: 0 + 's',
            left: alertNew
          } : {
              transition: animationTime + 's',
              left: defalutPos
            }
        }>
        <div>
          <h1>{title}</h1>
          <p>{msg}</p>
        </div>
        <button className='sfAlertDeclineBtn' onClick={declinedClicked} style={{ width: btnWidth }}>{noBtn}</button>
        <button className='sfAlertAcceptBtn' onClick={acceptClicked} style={{ width: btnWidth }}>{okBtn}</button>
      </div>
    </div>
  )
}

export default AlertBox;