// import React, { useState, CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const AppButton = (props) => {
  return (
    <button
      className="app-button"
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <BeatLoader
          color={"#000"}
          loading={props.disabled}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>{props.title}</>
      )}
    </button>
  );
};
export default AppButton;
