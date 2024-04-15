// Loginpage.js
import React from "react";
import FormLogin from "./Formlogin";

export default function Loginpage() {
  return (
    <div
      className="login-background"
      style={{
        backgroundColor: "#f0f2f5",
        height: "100vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormLogin />
    </div>
  );
}
