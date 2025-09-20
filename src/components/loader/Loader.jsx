// src/components/Loader.js
import React from "react";
import "./Loader.scss";

const Loader = ({ size = 20, color = "#fff" }) => {
  return (
    <div
      className="loader"
      style={{ "--dot-size": `${size}px`, "--dot-color": color }}
    ></div>
  );
};

export default Loader;
