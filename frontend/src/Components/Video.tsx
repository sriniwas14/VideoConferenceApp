import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import Webcam from "react-webcam";

function Video() {
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);

  const [peer, setPeer] = useState<any>(null);

  useEffect(() => {
    // Create a new WebRTC peer when the component mounts
    const peer = new Peer({ initiator: true, trickle: false });

    // Set up local video stream
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     localVideoRef.current.srcObject = stream;
    //     peer.addStream(stream);
    //   })
    //   .catch(console.error);

    // // Handle data channel messages
    // peer.on("data", (data) => {
    //   console.log("Received data: " + data);
    // });

    // // Handle the WebRTC negotiation and remote stream
    // peer.on("signal", (data) => {
    //   console.log("Generated signal: " + JSON.stringify(data));
    //   // Send this signal data to the other peer (you can use a signaling server)
    // });

    // peer.on("stream", (stream) => {
    //   remoteVideoRef.current.srcObject = stream;
    // });

    // // Set the peer in the component state
    // setPeer(peer);

    // return () => {
    //   peer.destroy();
    // };
  }, []);

  // Function to send a message over the data channel
  const sendMessage = (message: string) => {
    peer.send(message);
  };

  return (
    <div className="App">
      <h1>WebRTC Video Call</h1>
      <div className="videos">
        <div className="video">
          <h2>You</h2>
          <Webcam ref={localVideoRef} mirrored={true} />
        </div>
        <div className="video">
          <h2>Remote</h2>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
      <div className="controls">
        <button onClick={() => sendMessage("Hello from React!")}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Video;
