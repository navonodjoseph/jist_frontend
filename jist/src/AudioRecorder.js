import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { Button, Box} from '@chakra-ui/react'

const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: false });
  const [audioBlob, setAudioBlob] = useState(null); 

  useEffect(()=> {
    if (mediaBlobUrl){
      fetch(mediaBlobUrl)
      .then((response) => response.blob())
      .then((blob) => setAudioBlob(blob))
      .catch((error) => console.error('Error fetching audio Blob ln 16', error))
    }

  }, [mediaBlobUrl])

  const handleSaveRecording = async () => {
    //stop recording if in progress
    if (status === "recording") {
      stopRecording();
    }
    // create a formData object to send the recorded audio file

    const formData = new FormData();
    formData.append("audio", audioBlob, 'audio.wav');
    console.log('audio ln 30', audioBlob)

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
  };

  return (
    <Box>
      <Button onClick={startRecording}> Start Recording </Button>
      <Button onClick={stopRecording}> Stop Recording </Button>
      <Button onClick={handleSaveRecording}> Save Recording </Button>
      {status === "recording" && <p>.... recording in progress ...</p>}
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
    </Box>
  );
};
export default AudioRecorder;
