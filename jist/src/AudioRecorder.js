import React from 'react'; 
import { useState } from 'react'; 
import { ReactMic } from 'react-mic';
import axios from 'axios';

export default function AudioRecorder (){

const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  }
  const stopRecording = () =>{
    setIsRecording(false);
    sendAudioToBackend(); 
  }

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    setBlobURL(recordedBlob.blobURL); 
  }
 
  const sendAudioToBackend = async () =>{
    try{
      const audioBlob = new Blob([setBlobURL], { type: 'audio.webm'});
      const formData = new FormData();
      formData.append('audio', audioBlob)
      formData.append("Content-Type", 'audio/webm')
    
      const response = await axios.post('http://localhost:8000/', formData)
      console.log(response.data); 
      console.log(audioBlob)
      } catch (error){
        console.error(error)
      } 
 }

  
  return(
      <div className='App'>
        <h1>Audio Recorder</h1>
        {blobURL && (
          <audio controls>
            <source src={blobURL} type='audio.webM'/>
          </audio>
        )}
        <ReactMic
          record={isRecording}
          onStop={onStop}
          ondata={onData}
          strokeColor='black'
          backgroundColor='white'
          mimeType='audio.webM'
        />
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
          )}
      </div>
  )
}
