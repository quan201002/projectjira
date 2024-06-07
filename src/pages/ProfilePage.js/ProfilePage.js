import useSelection from "antd/es/table/hooks/useSelection";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileFormFormik from "./ProfileForm";

export default function ProfilePage() {
  let { userLogin } = useSelector((state) => state.UserLoginCyberBugsReducer);
  useEffect(() => {}, []);
  console.log(userLogin);
  return (
    <div className="profile-container">
      <div className="profile-image-container   mb-2 mb-md-3 mb-xl-5 ">
        <img
          className="profile-image"
          src={`https://ui-avatars.com/api/?name=${userLogin.name}&background=93bdea&bold=true`}
        ></img>
      </div>
      <div className="profile-form-container">
        <ProfileFormFormik />
      </div>
    </div>
  );
}
