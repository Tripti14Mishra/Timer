import React, {useState, useEffect, useRef} from 'react'



const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}


export default function CountdownApp() {
  const [second, setInitialSecond]=useState(0);
  const [minutes, setInitialMinutes]=useState(0);  
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [status, setStatus] = useState(STATUS.STOPPED);

  const minutesToDisplay = Math.floor(secondsRemaining / 60);
  const secondsToDisplay = Math.ceil(secondsRemaining % 60);



  

  const handleStart = () => {
    
    setSecondsRemaining( minutes*60+parseInt(second));
    setStatus(STATUS.STARTED);
    
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ?  1000: null,
    
  );

  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(0)
  }
 
  return (
    <div className="App">
      <h1>React Countdown Demo</h1>
      Minutes:<input type="text" onChange={(event)=>{setInitialMinutes(event.target.value);}}/>
      Seconds:<input type="text" onChange={(event)=>{setInitialSecond(event.target.value);}}/>
      <br/>
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
      <div style={{padding: 20}}>
        {twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      
    </div>
  )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')