import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SquareButton from "components/CustomUI/SquareButton";
import React from "react";
import useImageExportStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  handleClose: () => void;
  exportHandler?: (type: string, name?: string) => void;
}

enum ExportType {
  PNG = "image/png",
  JPG = "image/jpg",
  PDF = "pdf",
}

const ImageExport: React.FC<IProps> = ({ handleClose, exportHandler }) => {
  const [exportType, setExportType] = React.useState<ExportType>(
    ExportType.JPG
  );
  const [name, setName] = React.useState<string>();
  const style = useImageExportStyle();

  const switchHandler = (event: SelectChangeEvent) => {
    setExportType(event.target.value as ExportType);
  };

  const doExport = () => {
    exportHandler && exportHandler(exportType, name);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <Box className={style.surface}>
      <Box className={style.form}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="15px"
        >
          <Typography variant="h6">Export</Typography>
          <SquareButton
            color="error"
            variant="contained"
            disableElevation
            onClick={handleClose}
          >
            <CloseIcon />
          </SquareButton>
        </Box>
        <Box
          padding="0 20px 20px 20px"
          display="flex"
          flexDirection="column"
          gap="15px"
        >
          <Box display="flex" gap="10px" alignItems="center">
            <Typography style={{ width: "50%" }} variant="subtitle1">
              File name
            </Typography>
            <TextField
              placeholder="File name will be board name or id itseft"
              onChange={changeHandler}
              fullWidth
              size="small"
            />
          </Box>
          <Box display="flex" gap="10px" alignItems="center">
            <Typography style={{ width: "50%" }} variant="subtitle1">
              Choose your export type
            </Typography>
            <Select
              size="small"
              fullWidth
              value={exportType}
              onChange={switchHandler}
            >
              <MenuItem value={ExportType.JPG} key={ExportType.JPG}>
                image/jpg
              </MenuItem>
              <MenuItem value={ExportType.PNG} key={ExportType.PNG}>
                image/png
              </MenuItem>
            </Select>
          </Box>

          <Divider />
          <Button fullWidth variant="blur" onClick={doExport}>
            Export
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageExport;
