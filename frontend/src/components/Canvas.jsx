import { useRef, useEffect } from 'react';
const Canvas = function(props) {
  // const {} = props;
  const canvasRef = useRef(null);

  useEffect(()=> {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  }, [])


  return(
    <canvas ref={canvasRef}>
    </canvas>
  )
};

export default Canvas;