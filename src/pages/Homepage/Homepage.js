import React from "react";
import { useSelector } from "react-redux";

export default function Homepage() {
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );
  console.log("user", userLogin);
  return (
    <div className="content-container">
      {userLogin?.name}
      <img src={userLogin?.avatar}></img>
    </div>
  );
}
