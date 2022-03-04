import { useEffect, useRef, VideoHTMLAttributes } from "react";

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStreamTrack;
};

export default function Video({ srcObject, ...props }: PropsType) {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = new MediaStream([srcObject]);
  }, [srcObject]);

  return (
    <video
      onLoadedMetadata={() => {
        refVideo.current?.play();
      }}
      autoPlay
      id="my-video"
      ref={refVideo}
      muted={true}
      {...props}
    />
  );
}
