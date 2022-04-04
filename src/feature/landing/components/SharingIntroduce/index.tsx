import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Box, Button, Typography } from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import useSharingIntroduceStyle from "./style";
import shareScreenImage from "static/assets/landing/shareScreen.jpg";
import shareWebcamImage from "static/assets/landing/shareWebcam.jpg";
import shareMicImage from "static/assets/landing/shareMic.png";

const images = [shareScreenImage, shareWebcamImage, shareMicImage];
const texts = [
  "Sharing your screen to transmit your data better",
  "Sharing your webcam make the meet looks more realistic and professional",
  "Sharing your micro to communicate easier",
];

const SharingIntroduce = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const style = useSharingIntroduceStyle();
  const handleSwitch = useCallback(() => {
    setCurrentImage((prev) => prev + 1);
  }, []);
  useLayoutEffect(() => {
    if (currentImage >= 3) setCurrentImage(0);
  }, [currentImage]);
  useEffect(() => {
    let id = setInterval(handleSwitch, 5000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Box className={style.surface}>
      <Box className={style.header}>
        <Typography
          variant="h3"
          style={{
            fontWeight: 800,
          }}
        >
          Sharing your media
        </Typography>
      </Box>
      <Box className={style.content}>
        <Box className={style.slider}>
          <Box className={style.sliderBox}>
            <Box className={`${style.sliderImage}`}>
              <img width="100%" height="100%" src={images[currentImage]} />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gap="20px">
            <SquareButton
              variant="contained"
              color={currentImage === 0 ? "primary" : "inherit"}
              onClick={() => setCurrentImage(0)}
              style={{ position: "static" }}
            >
              {" "}
            </SquareButton>
            <SquareButton
              color={currentImage === 1 ? "primary" : "inherit"}
              variant="contained"
              style={{ position: "static" }}
              onClick={() => setCurrentImage(1)}
            >
              {" "}
            </SquareButton>
            <SquareButton
              variant="contained"
              color={currentImage === 2 ? "primary" : "inherit"}
              style={{ position: "static" }}
              onClick={() => setCurrentImage(2)}
            >
              {" "}
            </SquareButton>
          </Box>
        </Box>
        <Box className={style.introduce}>{texts[currentImage]}</Box>
      </Box>
    </Box>
  );
};

export default SharingIntroduce;
