import { useEffect } from "react";
import { gsap } from "gsap";

const Loader = () => {
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.set(".loader", { display: "block" })
      .set(".loader__element", { transformOrigin: "center right" })
      .to(".loader__element", { scaleX: 1, ease: "expo.inOut", stagger: 0.1, duration: 0.6 })
      .set(".loader__element", { transformOrigin: "center left" })
      .to(".loader__element", { scaleX: 0, ease: "expo.inOut", stagger: -0.1, duration: 0.6 })
      .set(".loader", { display: "none" });

    return () => {
      tl.kill(); // Clean up GSAP timelines to prevent memory leaks
    };
  }, []);

  return (
    <div className="loader fixed inset-0 hidden z-50">
      <div className="loader__element absolute inset-0 transform scale-x-0 bg-white"></div>
      <div className="loader__element absolute inset-0 transform scale-x-0 bg-black"></div>
    </div>
  );
};

export default Loader;
