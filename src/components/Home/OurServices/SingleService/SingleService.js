import React from "react";
import { useSpring, animated } from "react-spring";
import "./SingleService.css";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const SingleService = ({ service }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 350, friction: 40 },
  }));

  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >
      <div className="text-center p-3 single-service">
        <img src={`data:image/jpeg;base64,${service.image.img}`} alt="" />
        <h5 className="my-3">{service.title}</h5>
        <p className="text-secondary">{service.details}</p>
      </div>
    </animated.div>
  );
};

export default SingleService;
