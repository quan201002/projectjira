import React from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.9)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RingLoader size={150} color="#fca311" speedMultiplier={3} />
    </div>
  ) : (
    <></>
  );
}
