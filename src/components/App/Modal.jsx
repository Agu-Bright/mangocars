import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import axios from "axios";
import { URL } from "../../data";

const style = {
  maxHeight: "90vh",
  overflowY: "scroll",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 700, xs: 400 },
  bgcolor: "background.paper",
  padding: "12px",
  borderRadius: "5px",
  boxShadow: 20,
  p: 4,
  border: "none",
};

export default function DeliveryModal({ handleClose, open, notification }) {
  console.log(notification);

  const handleConfirm = async (_notification) => {
    console.log(_notification);
    try {
      const { data } = await axios.put(
        `${URL}/user/confirm-order/${_notification?.order}`,
        { status: "delivered" },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delivery Update{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {notification?.sender && notification?.sender[0].name + " "}
            has flagged this order as completed, confirm that the product is
            delivered{" "}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <button
              onClick={handleClose}
              style={{
                marginTop: "55px",
                border: "none",
                borderRadius: "5px",
                background: "white",
                width: "40%",
                height: "33.84px",
                color: "black",
              }}
            >
              cancel{" "}
            </button>
            <button
              onClick={() => handleConfirm(notification)}
              style={{
                marginTop: "55px",
                border: "none",
                borderRadius: "5px",
                background: "#109324",
                width: "40%",
                height: "33.84px",
                color: "white",
              }}
            >
              Confirm{" "}
            </button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
