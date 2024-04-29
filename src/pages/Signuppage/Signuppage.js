import React from "react";
import Formsignup from "./Formsignup";

export default function Signuppage() {
  return (
    <div className="row signup-page">
      <div className=" col-lg-6 col-md-12">
        <Formsignup />
      </div>
      <div className=" col-lg-6 col-md-0 text-center">
        <img src="../../register.png" alt="" className="signup-image"></img>
      </div>
    </div>
  );
}
