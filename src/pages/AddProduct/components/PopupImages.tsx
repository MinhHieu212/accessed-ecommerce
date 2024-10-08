import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductFormProps } from "../types/ProductFormProps";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupImages: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [primaryIndex, setPrimaryIndex] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageClick = (index: number) => {
    setPrimaryIndex(index);
  };

  return (
    <div>
      <Button onClick={handleOpen} className="capitalize">
        View all
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="capitalize "
            >
              Product Images
            </Typography>
            <Box className="w-full">
              {formData.images.length > 0 && (
                <img
                  src={formData.images[primaryIndex].url}
                  alt="Primary"
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
            <Box className="w-full">
              <ImageList
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "auto",
                }}
                cols={formData.images.length - 1}
              >
                {formData.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "8px",
                        cursor: "pointer",
                        border:
                          index === primaryIndex ? "2px solid blue" : "none",
                      }}
                      onClick={() => handleImageClick(index)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PopupImages;
