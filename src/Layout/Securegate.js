import React from "react";
import { message } from "antd";
export default function SecureGate({ children }) {
  // kiểm tra user đã đăng nhập hay chưa
  let dataJson = localStorage.getItem("USER_INFOR");
  let user = JSON.parse(dataJson);

  if (!user) {
    message.success("you need to signin");
    window.location.href = "/login";
  }
  return children;
}
