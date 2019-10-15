import React, { createRef, useEffect, useState, useMemo } from "react"

interface propsTypes {
  timer: number
  width: number
  height: number
}

const Circle = ({ timer, width, height }: propsTypes) => {
  let canvasRef: any = createRef()

  const [dragok, setDragok] = useState(false)

  const [circleX, circleY] = useMemo(() => [width / 2, height / 2], [width, height])

  const draw = (rad: number) => {
    const canvas: any = canvasRef.current
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, width, height)

      ctx.beginPath()
      ctx.moveTo(circleX, circleY)
      ctx.arc(circleX, circleY, circleX, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = "rgb(255,255,255)"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(circleX, circleY)
      ctx.arc(circleX, circleY, circleX, -0.5 * Math.PI, rad, false)
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = "#b13c3c"
      ctx.fill()

      drawNumbers(ctx, circleX)
    }
  }

  useEffect(() => {
    draw(-0.5 * Math.PI + Math.PI * 2 * (timer / 60))
  }, [timer])

  // handle mousedown events
  function myDown(e: any) {
    e.preventDefault()
    e.stopPropagation()

    setDragok(true)
  }

  function myUp(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragok(false)
  }

  function myMove(e: {
    clientX: any
    clientY: any
    preventDefault: Function
    stopPropagation: Function
  }) {
    if (dragok) {
      e.preventDefault()
      e.stopPropagation()
      const canvas: any = canvasRef.current
      const BB = canvas.getBoundingClientRect()
      const offsetX: any = BB.left
      const offsetY: any = BB.top
      const mx = parseInt((e.clientX - offsetX).toString())
      const my = parseInt((e.clientY - offsetY).toString())
      const rads = Math.atan2(my - 250, mx - 250)
      draw(rads)
    }
  }

  function drawNumbers(ctx: any, radius: number) {
    var ang
    var num
    ctx.font = radius * 0.15 + "px arial"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.translate(radius, radius)
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6
      ctx.rotate(ang)
      ctx.translate(0, -radius * 0.85)
      ctx.rotate(-ang)
      ctx.fillText(num.toString(), 0, 0)
      ctx.rotate(ang)
      ctx.translate(0, radius * 0.85)
      ctx.rotate(-ang)
    }
  }

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
      onMouseUp={myUp}
      onMouseDown={myDown}
      onMouseMove={myMove}
    />
  )
}

export default Circle
