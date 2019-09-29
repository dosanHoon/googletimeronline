import React,{useState,useCallback,useRef} from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {

  let intervalId:any = useRef(null)

  const [timer , setTimer] = useState(30)
  const [disabled , setDisabled] = useState(false)

  const clear = useCallback(()=>{
    setDisabled(false)
    clearInterval(intervalId.current)
  },[intervalId.current])

  const startTimer = useCallback(()=>{
    draw()
    setDisabled(true)
    let time = timer
    intervalId.current = setInterval(()=>{
      if(time > 0){
        setTimer(--time)
      }else{
        clear()
        alert("타이머 끝")
      }
    },100)
  },[intervalId.current,timer])

  const stopTimer = clear

  function draw() {
    var canvas : any =  document.getElementById('canvas');
    console.log("canvas",canvas)
    console.log("canvas",canvas.getContext)
    if (canvas.getContext) {
      console.log("canvas")
      var ctx = canvas.getContext('2d');
  
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          ctx.beginPath();
          var x = 25 + j * 50; // x coordinate
          var y = 25 + i * 50; // y coordinate
          var radius = 20; // Arc radius
          var startAngle = 0; // Starting point on circle
          var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
          var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise
  
          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  
          if (i > 1) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    }
  }

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
        <div id="canvas"/>
        <div>
          {/* {timer} */}
          <input type="text" onChange={(e)=>{setTimer(Number(e.target.value))}} value={timer} disabled={disabled}/>
        </div>
      </header>
    </div>
  );
}

export default App;
