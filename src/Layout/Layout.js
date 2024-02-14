import React from "react";
import ControllBar from "../component/ControllBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <ControllBar />
      <Outlet />
    </div>
  );
}
