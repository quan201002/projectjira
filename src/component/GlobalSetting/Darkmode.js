import { escape } from "lodash";
import React, { useState } from "react";

export default function Darkmode() {
  const bodyEl = document.querySelector("body");
  const inputEl = document.querySelector(".input");
  const [check, setCheck] = useState(false);

  function updateBody() {
    setCheck(!check);
    console.log("check", check);
    if (!check) {
      bodyEl.style.backgroundColor = "black";
      document.querySelector("html").classList.add("dark-mode");
    } else {
      bodyEl.style.backgroundColor = "white";
      document.querySelector("html").classList.remove("dark-mode");
    }
  }

  return (
    <>
      <input
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
