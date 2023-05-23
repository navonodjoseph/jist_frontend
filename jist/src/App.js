import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioRecorder from "./AudioRecorder";
import { Heading, Text } from "@chakra-ui/react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        const parsedData = JSON.parse(response.data);
        setData(parsedData);
        console.log(parsedData.fields.transcribe);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="audio-recorder">
      <Heading>Audio Recorder</Heading>
      <Text fontSize="x1">
        Simple audio recorder and transcriber using WhisperAI
      </Text>
      <AudioRecorder />
      {data.length > 0 ? (
        <div>
          <Heading as="h2">Transcript</Heading>
          {data.map((item) => (
            <div key={item.pk}>
              <Text>{item.fields.transcribe}</Text>
            </div>
          ))}
        </div>
      ) : (
        <Text>No transcripts available</Text>
      ) }
    </div>
  );
}
