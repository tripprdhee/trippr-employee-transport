import React from "react";
import { useState, CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";
import "./styles.css";

const AppLoader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("Yellow");

  return (
    <div className="loader-container">
      <ScaleLoader
        color={color}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="link-page">Loading.....</p>
    </div>
  );
};

export default AppLoader;
