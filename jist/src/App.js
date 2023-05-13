import React, { useEffect } from "react";
import axios from "axios";
import AudioRecorder from "./AudioRecorder";

export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        console.log(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <AudioRecorder />
    </div>
  );
}
