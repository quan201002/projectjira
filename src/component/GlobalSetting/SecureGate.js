import React from "react";
import { USER_LOGIN } from "../../redux/constant/SettingSystem";

export default function SecureGate({ children }) {
  let dataJson = localStorage.getItem(USER_LOGIN);
  let user = JSON.parse(dataJson);

  if (!user) {
    window.location.href = "/login";
  }
  return children;
}
