import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Assuming you would use a library like WebRTC or a third-party service for video calls.
import {
  FaMicrophone,
  FaMicrophoneAlt,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const VideoCallPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  // States to handle video and audio
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  // For simplicity, we will just use a state to simulate the call. In a real scenario, WebRTC would be used.
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // Simulating getting media stream (camera and microphone)
  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices", error);
      }
    };
    getMediaStream();
  }, []);

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  const toggleVideo = () => {
    setIsVideoOff((prevState) => !prevState);
  };

  const endCall = () => {
    // End the call and go back to appointments page
    setIsCallEnded(true);
    navigate("/appointments");
  };

  // Handling local and remote video stream (in real scenario, would handle with WebRTC or service)
  const renderLocalVideo = () => {
    if (localStream) {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          ref={(ref) => ref && (ref.srcObject = localStream)}
        />
      );
    }
  };

  const renderRemoteVideo = () => {
    if (remoteStream) {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          ref={(ref) => ref && (ref.srcObject = remoteStream)}
        />
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Video Container */}
      <div className="flex-grow relative">
        {/* Local Video */}
        <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-60 rounded-lg">
          {renderLocalVideo()}
        </div>

        {/* Remote Video */}
        <div className="w-full h-full">{renderRemoteVideo()}</div>
      </div>

      {/* Controls Section */}
      <div className="flex justify-center space-x-6 py-4 bg-black text-white">
        <button
          className="bg-transparent text-white text-2xl"
          onClick={toggleMute}
        >
          {isMuted ? <FaMicrophoneAlt /> : <FaMicrophone />}
        </button>

        <button
          className="bg-transparent text-white text-2xl"
          onClick={toggleVideo}
        >
          {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
        </button>

        <button
          className="bg-red-600 text-white text-2xl px-4 py-2 rounded-full"
          onClick={endCall}
        >
          End Call
        </button>
      </div>

      {/* Call Status */}
      {isCallEnded && (
        <div className="text-center py-4 text-gray-500">
          <p>Call Ended</p>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;
