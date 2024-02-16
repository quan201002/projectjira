import React from "react";
import ControllBar from "../component/ControllBar";
import { Outlet } from "react-router-dom";
import Modaljira from "../HOC/JiraCloneHOC/Modaljira";

export default function Layout() {
  return (
    <div>
      <Modaljira />
      <ControllBar />
      <Outlet />
    </div>
  );
}
