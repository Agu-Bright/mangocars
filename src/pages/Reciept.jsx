import PageLayout from "../components/App/PageLayout";
import { logo } from "../assets";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../data";
import { moneyFormat } from "../functions";

function formatDateString(dateString) {
  const date = new Date(dateString);
  // Extract the date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const readableDate = `${day}/${month}/${year}`;

  return readableDate;
}

const Reciept = ({ f7router, f7route }) => {
  const { id } = f7route.params;
  console.log("Reciept", id);
  const [order, setOrder] = useState();
  //-------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/order/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(data);
        setOrder(data?.order);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //---------------------------------------------------------------------
  const captureDivToImage = () => {
    const element = document.getElementById("reciept");
    html2canvas(element).then((canvas) => {
      const imageData = canvas.toDataURL("image/jpeg");
      saveImage(imageData);
    });
  };

  const convertImageToPDF = () => {
    const element = document.getElementById("reciept");
    html2canvas(element).then((canvas) => {
      const imageData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF();
      pdf.addImage(imageData, "JPEG", 0, 0);
      pdf.save("output.pdf");
    });
  };

  const saveImage = (imageData) => {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "output.jpg";
    link.click();
  };

  const calculateFee = (price) => {
    const fee = (1.5 / 100) * Number(price) + 100;
    return fee;
  };

  return (
    <PageLayout f7router={f7router}>
      <div
        className="px-4"
        style={{ background: "#EAEAEA", height: "100vh", paddingTop: "30px" }}
      >
        <div
          id="reciept"
          style={{
            background: "white",
            width: "100%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            borderRadius: "10px",
            // paddingTop: "100px",
          }}
        >
          <img
            style={{ width: "100px", height: "100px" }}
            src={logo}
            className="w-3/4"
            alt=""
          />
          <p style={{ color: "#109324", fontWeight: "700", fontSize: "14px" }}>
            Mango Cars Reciept
          </p>
          <ul
            style={{
              width: "100%",
              padding: "20px 50px 10px 50px",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Name:
                </span>
                <span>{order?.user?.name || "--"} </span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Car Model:
                </span>
                <span>
                  {" "}
                  {order?.orderItems?.name} ({order?.orderItems?.year}){" "}
                </span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Payment Method:
                </span>
                <span>{order?.paymentMethod} </span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Total Tax{" "}
                </span>
                <span>
                  {" "}
                  {moneyFormat(calculateFee(order?.orderItems?.price))}{" "}
                </span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Total Car Amount:
                </span>
                <span>{moneyFormat(order?.orderItems?.price)}</span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Seller / vendors Name:
                </span>
                <span>{order?.sellers?.name}</span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Date of Purchase:
                </span>
                <span>{formatDateString(order?.createdAt)}</span>
              </p>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <p>
                <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                  Transaction Status:
                </span>
                <span>{order?.paymentInfo?.status}</span>
              </p>
            </li>
          </ul>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <button
            onClick={convertImageToPDF}
            style={{
              marginTop: "55px",
              border: "none",
              borderRadius: "5px",
              background: "#109324",
              width: "214.11px",
              height: "33.84px",
              color: "white",
            }}
          >
            Save as PDF{" "}
          </button>

          <button
            onClick={captureDivToImage}
            style={{
              marginTop: "25px",
              border: "1px solid #109324",
              borderRadius: "5px",
              background: "white",
              width: "214.11px",
              height: "33.84px",
              color: "black",
            }}
          >
            Save as Image{" "}
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Reciept;
