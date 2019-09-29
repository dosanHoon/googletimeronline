import React,{useState,useCallback} from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [timer , setTimer] = useState(30)
  const [disabled , setDisabled] = useState(false)
  const [intervalId , setIntervalId]:[any,Function] = useState(null) 

  const startTimer = useCallback(()=>{
    setDisabled(true)
    let time = timer
    const current = setInterval(()=>{
      console.log("timer",time)
      if(time > 0){
        setTimer(--time)
      }else{
        console.log("clearInterval",intervalId)
        clear()
        alert("알람끝")
      }
    },100)

    setIntervalId(current)
  },[timer])


  const stopTimer = ()=>{
    clear()
  }

  const clear = useCallback(()=>{
    setDisabled(false)
    clearInterval(intervalId)
  },[intervalId])
  // const stopTimer = ()=>{

  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={startTimer}>
          시작하기
        </button>
        <button onClick={stopTimer}>
          취소하기
        </button>
        <div>
          {/* {timer} */}
          <input type="text" onChange={(e)=>{setTimer(Number(e.target.value))}} value={timer} disabled={disabled}/>
        </div>
      </header>
    </div>
  );
}

export default App;
