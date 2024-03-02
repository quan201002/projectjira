import React from "react";
import ControllBar from "../component/ControllBar";
import { Outlet } from "react-router-dom";
import Modaljira from "../HOC/JiraCloneHOC/Modaljira";
import ModalDetail from "../HOC/JiraCloneHOC/ModalDetail";

export default function Layout() {
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
