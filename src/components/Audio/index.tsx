import { Box } from "@mui/material";
import React, { AudioHTMLAttributes, useEffect, useRef, useState } from "react";
type PropsType = AudioHTMLAttributes<HTMLAudioElement> & {
  srcObject: MediaStreamTrack;
};

export default function Audio({ srcObject, ...props }: PropsType) {
  const refAudio = useRef<HTMLAudioElement>(null);
  const [frequency1, setFrequency1] = useState<number>(0);
  const [frequency2, setFrequency2] = useState<number>(0);
  const [frequency3, setFrequency3] = useState<number>(0);

  useEffect(() => {
    if (!refAudio.current) return;
    let audioStream = new MediaStream([srcObject]);
    refAudio.current.srcObject = audioStream;
    var context = new AudioContext();
    var source = context.createMediaStreamSource(audioStream);
    var analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 32;

    const analyserId = setInterval(() => {
      var frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyData);
      setFrequency1(frequencyData[0]);
      setFrequency2(frequencyData[2]);
      setFrequency3(frequencyData[3]);
    }, 15);
    return () => {
      clearInterval(analyserId);
    };
  }, [srcObject]);

  return (
    <>
      {(frequency2 / 255) * 100 > 50 && (
        <Box
          position="absolute"
          style={{
            padding: "5px 15px",
            backgroundColor: "#6c63ff",
            margin: "10px",
            borderRadius: "20px",
            display: "flex",
            color: "white",
            height: "25px",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <Box
            style={{
              width: "7.5px",
              height: `${(frequency2 / 255) * 100}%`,
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          />
          <Box
            style={{
              width: "7.5px",
              height: `${(frequency1 / 255) * 100}%`,
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <Box
            style={{
              width: "7.5px",
              height: `${(frequency3 / 255) * 100}%`,
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          />
        </Box>
      )}
      <audio autoPlay id="my-video" ref={refAudio} {...props} />
    </>
  );
}
