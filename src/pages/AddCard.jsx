import { useContext, useEffect } from "react";
import PageLayout from "../components/App/PageLayout";
import { moneyFormat } from "../functions";
import { CarContext } from "../components/context/CarContext";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box, Stack } from "@mui/material";
const Transactions = ({ f7router }) => {
  const { setPageType } = useContext(CarContext);

  useEffect(() => {
    setPageType("addCard");

    return () => {
      setPageType("");
    };
  }, []);

  return (
    <PageLayout f7router={f7router} title={"New Card"}>
      <div
        className="p-4"
        style={{
          height: "80vh",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1.5px solid green",
            display: "flex",
            borderRadius: "5px",
          }}
        >
          <PaymentIcon sx={{ height: "100%", width: "15%" }} />
          <input
            style={{
              fontWeight: "500",
              fontSize: "25px",
              width: "inherit",
              padding: "5px",
              marginRight: "5px",
            }}
            placeholder="Card Number"
          />
        </div>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            marginTop: "15px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "45%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F3F3",
              borderRadius: "5px",
            }}
          >
            <input
              placeholder="Expiry Date"
              style={{
                width: "90%",
                height: "100%",
                fontWeight: "500",
                fontSize: "20px",
                padding: "10px",
                background: "transparent",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "45%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F3F3",
              borderRadius: "5px",
            }}
          >
            <input
              placeholder="Secure Code"
              style={{
                width: "90%",
                height: "100%",
                fontWeight: "500",
                fontSize: "20px",
                padding: "10px",
                background: "transparent",
              }}
            />
          </Box>
        </Stack>
        <div
          style={{
            display: "flex",
            alignItems: "cente",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              marginTop: "100px",
              height: "45px",
              width: "40%",
              background: "#109324",
              borderRadius: "20px",
              color: "white",
              fontWeight: "500",
            }}
          >
            Add Card
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Transactions;
