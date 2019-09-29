import React,{useState,useCallback} from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [timer , setTimer] = useState(30)

  const startTimer = useCallback(()=>{
    let time = timer
    const current = setInterval(()=>{
      console.log("timer",time)
      if(time > 0){
        setTimer(--time)
      }else{
        console.log("clearInterval",current)
        clearInterval(current)
        alert("알람끝")
      }
    },100)
  },[timer])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={startTimer}>
          시작하기
        </button>
        <div>
          {/* {timer} */}
          <input type="text" onChange={(e)=>{setTimer(Number(e.target.value))}} value={timer}/>
        </div>
      </header>
    </div>
  );
}

export default App;
