import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobURL } =
    useReactMediaRecorder({ audio: true });

  const handleSaveRecording = async () => {
    //stop recording if in progress
    if (status === "recording") {
      stopRecording();
    }
    // create a formData object to send the recorded audio file
    if (mediaBlobURL) {
      const response = await fetch(mediaBlobURL);
      const audioBlob = await response.blob();

      const formData = new FormData();
      formData.append("audio", audioBlob);
      console.log("Friday at 8", audioBlob, mediaBlobURL);

      try {
        //send audio to backend
        console.log("logging data");
        await axios.post("http://localhost:8000", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Recording saved successfully");
      } catch (error) {
        console.error("Error saving recording:", error);
      }
    }
  };
  return (
    <div>
      <button onClick={startRecording}> Start Recording </button>
      <button onClick={stopRecording}> Stop Recording </button>
      <button onClick={handleSaveRecording}> Save Recording </button>
      {status === "recording" && <p>.... recording in progress ...</p>}
      {mediaBlobURL && <audio src={mediaBlobURL} controls />}
    </div>
  );
};
export default AudioRecorder;
