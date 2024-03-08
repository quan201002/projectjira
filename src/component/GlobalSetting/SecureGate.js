import React from "react";
import { USER_LOGIN } from "../../redux/constant/SettingSystem";

export default function SecureGate({ children }) {
  // kiểm tra user đã đăng nhập hay chưa
  let dataJson = localStorage.getItem(USER_LOGIN);
  let user = JSON.parse(dataJson);

  if (!user) {
    window.location.href = "/login";
  }
  return children;
}
