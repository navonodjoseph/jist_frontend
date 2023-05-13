import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioRecorder from "./AudioRecorder";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        setData(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="audio-recorder">
      <AudioRecorder />
      <div className="textbox">
        {data ? (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ): (
          <p>...Loading...</p>
        )}
      </div>
    </div>
  );
}
