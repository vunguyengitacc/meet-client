import React, { AudioHTMLAttributes, useEffect, useRef } from "react";
type PropsType = AudioHTMLAttributes<HTMLAudioElement> & {
  srcObject: MediaStreamTrack;
};

export default function Audio({ srcObject, ...props }: PropsType) {
  const refAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!refAudio.current) return;
    refAudio.current.srcObject = new MediaStream([srcObject]);
  }, [srcObject]);

  return (
    <audio
      onLoadedMetadata={() => {
        refAudio.current?.play();
      }}
      autoPlay
      id="my-video"
      ref={refAudio}
      {...props}
    />
  );
}
