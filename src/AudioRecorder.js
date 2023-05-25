import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { Button, Box } from "@chakra-ui/react";

const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: false });
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => setAudioBlob(blob))
        .catch((error) =>
          console.error("Error fetching audio Blob ln 16", error)
        );
    }
  }, [mediaBlobUrl]);

  const handleSaveRecording = async () => {
    //stop recording if in progress
    if (isRecording) {
      stopRecording();
    }

    if (!audioBlob) {
      console.error("Audio blob is not available yet");
    }
    // can you convert to .wav file here instead of doing on backend?

    //create formData object to send the recorded audio file
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    // formData.append("audio", "mediaBlobURL" )
    console.log("audio ln 34", audioBlob);

    try {
      //send audio to backend
      console.log("logging data");
      await axios.post("http://localhost:8000", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Recording saved successfully");
      console.log("audio", mediaBlobUrl);
    } catch (error) {
      console.error("Error saving recording:", error);
    }
    let audio = new Audio(mediaBlobUrl);
    audio.play();
  };

  return (
    <div className="buttons">
      <audio />
      {status === "recording" ? (
        <Button onClick={stopRecording}> Stop Recording </Button>
      ) : (
        <Button onClick={startRecording}> Start Recording </Button>
      )}
      <Button onClick={handleSaveRecording}> Transcibe </Button>
      {status === "recording" && <p>.... recording in progress ...</p>}
      {mediaBlobUrl && (
        <Box display="flex" justifyContent="center" mt={4}>
          <audio src={mediaBlobUrl} controls />
        </Box>
      )}
    </div>
  );
};
export default AudioRecorder;
