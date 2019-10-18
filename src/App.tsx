import React, { useState, useCallback, useRef } from "react"
import Circle from "./components/Circle"
import styled from "styled-components"

const App: React.FC = () => {
  let intervalId: any = useRef(null)

  const [timer, setTimer]: [number, Function] = useState(30)
  const [isStart, setIsStart]: [boolean, Function] = useState(false)
  const [isPause, setIsPause]: [boolean, Function] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const togglePause = useCallback(() => {
    setIsPause(!isPause)
    if (!isPause) {
      pauseTimer()
    } else {
      startTimer()
    }
  }, [isPause])

  const pauseTimer = useCallback(() => {
    clearInterval(intervalId.current)
  }, [intervalId])

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
        <H1>구글 타이머</H1>
      </header>
      <Circle timer={timer} width={500} height={500} isStart={isStart} setTimer={setTimer} />
      <div>
        <Input
          type="text"
          onChange={e => {
            setTimer(Number(e.target.value))
          }}
          value={`${Math.round(timer)}`}
          disabled={disabled}
        />
        분
      </div>
      <ButtonWrap>
        <Button onClick={startTimer}>시작하기</Button>
        <Button onClick={clear}>취소하기</Button>
        <Button onClick={togglePause}>일시정지</Button>
      </ButtonWrap>
    </div>
  )
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: black;
  font-size: 15px;
  display: inline-block;
  margin-right: 10px;
`

const ButtonWrap = styled.div`
  margin-top: 20px;
  display: inline-block;
`

const H1 = styled.h1`
  text-align: center;
`
const Input = styled.input`
  background: none;
  font-size: 48px;
  font-weight: bold;
  color: white;
  outline: none;
  border: 1px solid;
  width: 100px;
  padding: 10px;
`

export default App
