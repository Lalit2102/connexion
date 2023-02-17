import React from "react";
import "./spin.css";

function Spinner(props) {
  return (
    props.loading && (
      <>
        <div className="spinner-back">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      </>
    )
  );
}

export default Spinner;
