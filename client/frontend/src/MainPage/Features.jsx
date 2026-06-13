import gsap from "gsap";
import { useEffect, useRef } from "react";

function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-[80vw] h-20">
      <div
        ref={containerRef}
        className="flex w-max gap-[100px] mt-7 text-[#7251B5]"
      >
        {[
          "Live Drawing",
          "Remote Teamwork",
          "Online WhiteBoard",
          "Multi-User Editing",
          "Project Planning"
        ].map((text, i) => (
          <h1 key={i} className="whitespace-nowrap text-lg ">
            {text}
          </h1>
        ))}

        {[
          "Live Drawing",
          "Remote Teamwork",
          "Online WhiteBoard",
          "Multi-User Editing",
          "Project Planning"
        ].map((text, i) => (
          <h1 key={`dup-${i}`} className="whitespace-nowrap  ">
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default Features;
