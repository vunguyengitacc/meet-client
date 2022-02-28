import { Box, Button, Grid, Typography } from "@mui/material";
import TextInput from "components/Input/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useImageSearchStyle from "./style";
import SearchIcon from "@mui/icons-material/Search";
import ImageSearchSkeleton from "./skeleton";

interface Image {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface IProps {
  setImage?: (url: string) => void;
}

const ImageSearch: React.FC<IProps> = (props) => {
  const [images, setImages] = useState<Image[]>([]);
  const [image, setImage] = useState<Image>();
  const [onFetching, setOnFetching] = useState<boolean>(false);
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      term: "",
    },
  });

  const style = useImageSearchStyle();

  const searchHandler = async (payload: { term: string }) => {
    try {
      if (payload.term.length < 1) return;
      setOnFetching(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${payload.term}&client_id=bKu3TU18ByPVqmXsLe6eZuZ7al7N9dG7J1eTZcvQna0`
      );
      const data = await res.json();
      setImages((data.results as Image[]).splice(0, 9));
    } catch (error) {}
    setOnFetching(false);
  };

  const chooseHandler = (value: Image) => {
    if (value.id === image?.id) setImage(undefined);
    else value && setImage(value);
  };

  React.useEffect(() => {
    if (props.setImage === undefined) return;
    image && props.setImage(image.urls.thumb);
  }, [image]);

  return (
    <Box>
      <form onSubmit={form.handleSubmit(searchHandler)} className={style.form}>
        <TextInput
          className={style.input}
          form={form}
          name="term"
          autoComplete="off"
          hideError
        />
        <Button variant="contained" type="submit" disableElevation>
          <SearchIcon />
        </Button>
      </form>
      <Box padding="10px" minHeight="50px">
        {!onFetching && images.length === 0 && (
          <Typography
            style={{
              textAlign: "center",
              fontWeight: 700,
              color: "#80808085",
            }}
          >
            Not any Image
          </Typography>
        )}
        {onFetching && <ImageSearchSkeleton />}
        <Grid container spacing={1}>
          {images.map((i, index) => (
            <Grid key={index} item xs={4}>
              <img
                src={i.urls.thumb}
                className={`${style.item} ${
                  i.id === image?.id && style.chosenItem
                }`}
                onClick={() => chooseHandler(i)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ImageSearch;
