import { useState } from 'react'; 
import { ReactMic } from 'react-mic'

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
