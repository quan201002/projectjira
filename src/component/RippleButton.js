import { Button } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function RippleButton() {
  const [position, setPosition] = useState({
    xPos: "",
    yPos: "",
  });
  const ripple = (e) => {
    const target = document.querySelector(".ripple-btn");
    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;
    // console.log("pageX", e.pageX);
    // console.log("pageY", e.pageY);
    console.log("offsetLeft", target.offsetLeft);
    console.log("offsetTop", target.offsetTop);
    target.style.setProperty("--xPos", x + "px");
    target.style.setProperty("--yPos", y + "px");

    //
  };
  return (
    <NavLink to="/login " className="ripple-btn" onMouseOver={ripple}>
      <span>Login hear</span>
    </NavLink>
  );
}
