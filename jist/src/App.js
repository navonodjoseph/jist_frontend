import React from "react";
import axios from "axios";
import AudioRecorder from "./AudioRecorder";
import { Heading, Text } from '@chakra-ui/react'

export default function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000");
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error: ", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="audio-recorder">
      <Heading>Audio Recorder</Heading>
      <Text fontSize='x1'>
        Simple audio recorder and transcriber using WhisperAI 
      </Text>
      <AudioRecorder />
    </div>
  );
}
