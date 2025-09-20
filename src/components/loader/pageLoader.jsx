// src/components/loader/PageLoader.jsx
import React from "react";
import "./pageLoader.scss";

const PageLoader = ({ text = "Please wait..." }) => {
  return (
    <div className="search-loader-overlay">
      <div className="loader-content">
        <div className="trip-dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PageLoader;
