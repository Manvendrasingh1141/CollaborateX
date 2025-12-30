import { useRef, useEffect } from "react";

const features = [
  {
    title: "How It Works",
    description: [
      "User opens a whiteboard session",
      "The system connects users via WebSockets",
      "Any drawing or text action is instantly synced",
      "Board can be saved and reopened later"
    ],
    video: "first.mp4"
  },
  {
    title: "Built for Collaboration",
    description: [
      "Supports multiple users simultaneously",
      "Instant updates without refresh",
      "Works on all modern browsers",
      "Optimized for performance"
    ],
    video: "second.mp4"
  }
];

function CardContainer() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  
  const cardsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const randomColor = () =>
      `hsl(${Math.random() * 360}, 100%, 60%)`;

    const mouseEnter = (e) => {
      drawing.current = true;
      last.current = { x: e.offsetX, y: e.offsetY };
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = 70;
      ctx.lineCap = "round";
    };

    const mouseMove = (e) => {
      if (!drawing.current) return;

      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      last.current = { x: e.offsetX, y: e.offsetY };
    };

    const mouseLeave = () => {
      drawing.current = false;
    };

    wrapper.addEventListener("mouseenter", mouseEnter);
    wrapper.addEventListener("mousemove", mouseMove);
    wrapper.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mouseenter", mouseEnter);
      wrapper.removeEventListener("mousemove", mouseMove);
      wrapper.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  const handleEnter = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transform = "rotateY(180deg)";
      card.style.transition = "transform 0.6s";
    }
  };

  const handleLeave = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transform = "rotateY(0deg)";
      card.style.transition = "transform 0.6s";
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative my-10 mx-[100px] text-[#7251B5]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 flex flex-col items-center pointer-events-none cursor-pointer">
          <div className="text-7xl font-semibold mb-6">
            Why Choose This Whiteboard?
          </div>

          <div className="text-6xl font-semibold text-center leading-20">
            The platform provides a simple and intuitive interface with real-time
            collaboration. It works directly in the browser without installation
            and is built on a secure, scalable architecture, making it ideal for
            remote work and learning.
          </div>
        </div>
      </div>

      <div className="w-[80vw] mt-10 h-[50vh] text-[#7251B5] flex flex-row justify-center gap-x-5">
        {features.map((item, index) => (
          <div
            key={index}
            className="w-full h-full [perspective:1200px]"
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative w-full h-full rounded-xl [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden]">
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-black text-white px-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  
                  <ul className="text-base font-normal space-y-2">
                    {item.description.map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardContainer;
