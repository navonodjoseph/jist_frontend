import React from 'react'; 
import { useState } from 'react'; 
import { ReactMic } from 'react-mic';
import axios from 'axios';

export default function AudioRecorder (){

const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  }
  const stopRecording = () =>{
    setIsRecording(false);
  }

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    try{
      const formData = new FormData(); 
      formData.append('audio', recordedBlob.blob, 'audio.wav'); 

      await axios.post('http://localhost:8000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) 
      console.log('New audio uploaded');
    }catch (error){
      console.error('Error uploading audio: ', error); 
    }
  
    console.log('recordedBlob is: ', recordedBlob);
    setAudioUrl(recordedBlob.blobURL);

  };

  return(
      <div className='App'>
        <h1>Audio Recorder</h1>
        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type='audio/mp3'/>
          </audio>
        )}
        <ReactMic
          record={isRecording}
          onStop={onStop}
          ondata={onData}
          strokeColor='black'
          backgroundColor='white'
        />
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
          )}
      </div>
  )
}
