import React from "react";
import Formsignup from "./Formsignup";

export default function Signuppage() {
  return (
    <div className="row signup-page">
      <div className="col-md-12 col-lg-6">
        <Formsignup />
      </div>
      <div className="col-lg-6 text-center sigup-image-contaier">
        <img src="../../register.png" alt="" className="signup-image"></img>
      </div>
    </div>
  );
}
