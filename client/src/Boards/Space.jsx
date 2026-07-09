import { useEffect, useRef, useState } from "react";
import { socket } from "../socket"; 

function Space({ data, toolsData, image, roomId, username }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = data.coll;
    ctx.lineWidth = data.strokk;
    ctx.globalAlpha = Math.min(Math.max(data.opacc, 0), 1);

    ctx.globalCompositeOperation =
      toolsData === "eraser" ? "destination-out" : "source-over";

    canvas.style.backgroundColor = data.bgg;

    ctxRef.current = ctx;
  }, [data, toolsData]);


  useEffect(() => {
    if (!image) return;
    const ctx = ctxRef.current;
    ctx.drawImage(image, 100, 100, 300, 300);

    socket.emit("draw", { roomId, drawData: { type: "image", src: image.src } });
  }, [image, roomId]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId, username });

    const handleDraw = (drawData) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      if (drawData.type === "line") {
        ctx.strokeStyle = drawData.color;
        ctx.lineWidth = drawData.width;
        ctx.globalAlpha = drawData.opacity;
        ctx.globalCompositeOperation =
          drawData.tool === "eraser" ? "destination-out" : "source-over";

        ctx.beginPath();
        ctx.moveTo(drawData.from.x, drawData.from.y);
        ctx.lineTo(drawData.to.x, drawData.to.y);
        ctx.stroke();
        ctx.closePath();
      }

      if (drawData.type === "image") {
        const img = new Image();
        img.src = drawData.src;
        img.onload = () => ctx.drawImage(img, 100, 100, 300, 300);
      }
    };

    socket.on("draw", handleDraw);

    return () => {
      socket.off("draw", handleDraw);
    };
  }, [roomId, username]);

 
  const startDrawing = (e) => {
    if (toolsData !== "pen" && toolsData !== "eraser") return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = ctxRef.current;
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("draw", {
      roomId,
      drawData: {
        type: "line",
        from: { x: ctx.lastX || x, y: ctx.lastY || y },
        to: { x, y },
        color: data.coll,
        width: data.strokk,
        opacity: data.opacc,
        tool: toolsData,
      },
    });

    ctx.lastX = x;
    ctx.lastY = y;
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    ctxRef.current.lastX = null;
    ctxRef.current.lastY = null;
  };

  return (
    <div className="bg-white overflow-scroll w-[93vw] h-[90vh]">
      <canvas
        ref={canvasRef}
        width={5000}
        height={5000}
        className="bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default Space;
