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

  return <video muted autoPlay id="my-video" ref={refVideo} {...props} />;
}
