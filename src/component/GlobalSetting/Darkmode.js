import { escape, update } from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function Darkmode() {
  let dispatch = useDispatch();
  const bodyEl = document.querySelector("body");
  const inputEl = document.getElementById("dark-mode");

  const [check, setCheck] = useState(JSON.parse(localStorage.getItem("mode")));
  const updateBody = () => {
    setCheck(!check);
    localStorage.setItem("mode", JSON.stringify(!check));
    if (!check) {
      bodyEl.style.backgroundColor = "black";
      document.querySelector("html").classList.add("dark-mode");
    } else {
      bodyEl.style.backgroundColor = "white";
      document.querySelector("html").classList.remove("dark-mode");
    }
  };

  return (
    <>
      <input
        checked={check}
        type="checkbox"
        id="dark-mode"
        className="input"
        onClick={updateBody}
      />
      <label htmlFor="dark-mode" className="label">
        <div className="circle" />
      </label>
    </>
  );
}
