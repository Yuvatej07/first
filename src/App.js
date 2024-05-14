import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      setRunning(prevRunning => !prevRunning);
      setClickCount(prevCount => prevCount + 1);
    } else if (event.code === 'Enter') {
      setTime(0);
      setRunning(false);
      setClickCount(0);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-heading">Stopwatch</h1>
      <p className="stopwatch-time">{formatTime(time)}</p>
      <p className="stopwatch-instructions">Press space bar to start/stop, enter to reset</p>
      <p className="stopwatch-clicks">Space bar clicked: <span className='span'>{clickCount} </span>times</p>
    </div>
  );
};

export default App;
