import React, { useRef} from "react";
import {ReactMediaRecorder} from "react-media-recorder";
import axios from "axios";

const AudioRecorder = () => {
  const mediaBlobUrl = useRef(null)
  
  const handleRecordingStop = async (blob) => {
    //send the recorded audio to django api
    const file = new File([blob], 'audio.wav', {
      type: 'audio/wav',
    })
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post("http://localhost:8000", formData) 
      if (response.status === 200) {
        console.log("Audio sent successfully");
      } else {
        console.error("Error sending audio");
      }
    } catch (error) {
      console.error("Error sending audio", error);
    }
  };
  return (
    <ReactMediaRecorder
      video={false}
      render={({ startRecording, stopRecording, mediaBlobUrl }) => (
        //Saving media blob
       
         <div>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <audio src={mediaBlobUrl} controls />
        </div>
        
    )}
      onStop={handleRecordingStop}
    />
  );
};

export default AudioRecorder
