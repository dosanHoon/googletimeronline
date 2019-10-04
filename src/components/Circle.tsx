import React,{createRef,useEffect} from 'react'

const Circle = ({timer } :any) => {
    let canvasRef:any = createRef()
    useEffect(()=>{
        var canvas : any =  canvasRef.current
    // console.log("canvas",canvas)
    // console.log("canvas",canvas.getContext)
    if (canvas.getContext) {
        console.log(timer)
        console.log((Math.PI/180)*timer)
        var ctx = canvas.getContext('2d');
        ctx.moveTo(200, 200);
        ctx.arc(200,200,50,0, (Math.PI/180)*timer, true);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle="rgb(255,255,255)"  
        ctx.fill();  
    }
    },[timer])
    return (
        <canvas 
        width="500" height="500"
        // style={{background : "white",width:500,height:500}}
         ref={canvasRef}/>
    )
}

export default Circle