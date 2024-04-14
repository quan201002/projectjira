import React, { useState } from "react";
import ControllBar from "../component/ControllBar";
import { Outlet } from "react-router-dom";
import Modaljira from "../HOC/JiraCloneHOC/Modaljira";
import ModalDetail from "../HOC/JiraCloneHOC/ModalDetail";

export default function Layout() {
  const inputEl = document.getElementById("dark-mode");
  console.log("input element", inputEl);
  const bodyEl = document.querySelector("body");
  const isDarkMode = JSON.parse(localStorage.getItem("mode"));

  console.log(isDarkMode);
  if (isDarkMode) {
    bodyEl.style.backgroundColor = "black";
    document.querySelector("html").classList.add("dark-mode");
  } else {
    bodyEl.style.backgroundColor = "white";
    document.querySelector("html").classList.remove("dark-mode");
  }
  return (
    <div>
      <Modaljira />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ControllBar />
        <Outlet />
      </div>
    </div>
  );
}
