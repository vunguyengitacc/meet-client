import { Grid, Skeleton } from "@mui/material";
import React from "react";

const ImageSearchSkeleton = () => {
  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Grid item xs={4}>
          <Skeleton variant="rectangular" height="100px" />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageSearchSkeleton;
