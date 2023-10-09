import React from "react";
import Header from "../Components/Header";
import AgoraUIKit from "agora-react-uikit";

export default function Session() {
  const rtcProps = {
    appId: "a9f15d4fc12e4865b8fb41df02d36a1e",
    channel: "Test",
    token:
      "007eJxTYLis3JPI0umkWt9yPz/WyWs136pPE+ynv4tlynYIcdno4KLAkGiZZmiaYpKWbGiUamJhZppkkZZkYpiSZmCUYmyWaJg68b5yakMgI0NDuC4DIxSC+CwMIanFJQwMAK7HHTc=", // enter your channel token as a string
  };
  return (
    <div className="h-full">
      <Header />
      <AgoraUIKit rtcProps={rtcProps} />
    </div>
  );
}
