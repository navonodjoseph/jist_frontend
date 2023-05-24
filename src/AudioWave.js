import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioWaveform = ({ mediaBlobUrl, status }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    let wavesurfer = null;

    if (status === "recording") {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "blue",
        progressColor: "purple",
        cursorWidth: 0,
      });
      wavesurferRef.current = wavesurfer;
    }
    if (status === "recording" && wavesurfer) {
      wavesurfer.microphone.start();
    }
    return () => {
      if (wavesurfer) {
        wavesurfer.microphone.stop();
        wavesurfer.destroy();
      }
    };
  }, [status]);

  return (
    <>
      <div ref={waveformRef} />
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
    </>
  );
};

export default AudioWaveform;
