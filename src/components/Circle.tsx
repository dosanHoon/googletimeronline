import React,{createRef,useEffect} from 'react'

const Circle = ({timer } :any) => {
    let canvasRef:any = createRef()

    useEffect(()=>{
        console.log("timer",timer)
        var canvas : any =  canvasRef.current
        if (canvas.getContext) {
            console.log("timer",(Math.PI*2)*(timer/60))
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 500, 500);

            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250,250,250,0, (Math.PI*2), true);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle="rgb(255,255,255)"  
            ctx.fill();  

            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250,250,250,-0.5 * Math.PI, -0.5 *Math.PI + (Math.PI)*2*(timer/60), false);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle="rgb(255,0,0)"  
            ctx.fill();  
        }
    },[timer])

    return (
        <canvas  width="500" height="500" ref={canvasRef}/>
    )
}

export default Circle