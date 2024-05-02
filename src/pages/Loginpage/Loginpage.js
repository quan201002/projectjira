// Loginpage.js
import React from "react";
import FormLogin from "./Formlogin";

export default function Loginpage() {
  return (
    <div
      className="login-background"
      style={{
        height: "100vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row w-100 ">
        <div className="col-lg-6 login-image">
          <div className="image-container">
            <img className="image" src="../../login.png"></img>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
