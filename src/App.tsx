import React, { useState, useCallback, useRef } from "react"
import "./App.css"
import Circle from "./components/Circle"

const App: React.FC = () => {
  let intervalId: any = useRef(null)

  const [timer, setTimer]: [number, Function] = useState(30)
  const [isStart, setIsStart]: [boolean, Function] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const clear = useCallback(() => {
    setDisabled(false)
    setIsStart(false)
    setTimer(0)
    clearInterval(intervalId.current)
  }, [intervalId.current])

  const startTimer = useCallback(() => {
    setDisabled(true)
    setIsStart(true)
    let time = timer
    intervalId.current = setInterval(() => {
      if (time >= 0) {
        setTimer(--time)
      } else {
        clear()
        alert("타이머 끝")
      }
    }, 100)
  }, [intervalId.current, timer])

  return (
    <div className="App">
      <header className="App-header">
        <Circle timer={timer} width={500} height={500} isStart={isStart} setTimer={setTimer} />
        <div>
          <input
            type="text"
            onChange={e => {
              setTimer(Number(e.target.value))
            }}
            value={Math.round(timer)}
            disabled={disabled}
          />
        </div>
        <button onClick={startTimer}>시작하기</button>
        <button onClick={clear}>취소하기</button>
      </header>
    </div>
  )
}

export default App
