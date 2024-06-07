import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Page } from "framework7-react";
import { useContext } from "react";
import { CarContext } from "../context/CarContext";
import { ToastContainer } from "react-toastify";

const PageLayout = ({ f7router, title, children, type }) => {
  const { pageType } = useContext(CarContext);
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "50%",
  };
  const setStyle = (_type) => {
    if (_type === "type2") {
      return {
        background: "green",
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px",
        paddingTop: "25px",
        paddingBottom: "25px",
      };
    }
  };

  return (
    <Page className="bg-zinc-50">
      <nav
        style={{
          background: `${type === "type2" ? "green" : ""}`,
          borderTopRightRadius: `${type === "type2" ? "15px" : ""}`,
          borderTopLeftRadius: `${type === "type2" ? "15px" : ""}`,
          paddingTop: `${type === "type2" ? "25px" : ""}`,
          paddingBottom: `${type === "type2" ? "25px" : ""}`,
        }}
        className="flex gap-4 p-4 text-lg text-center items-center bg-zinc-100 font-bold"
      >
        {pageType === "addCard" || type === "type2" ? (
          <div
            style={{
              width: "35%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
            onClick={() => {
              f7router.back();
            }}
          >
            <h2
              style={{
                color: `${type === "type2" ? "white" : "#109324"}`,
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              cancel
            </h2>
          </div>
        ) : (
          <ChevronLeftIcon
            onClick={() => {
              f7router.back();
            }}
            className="w-6"
          />
        )}

        <h2
          style={{ ...style, color: `${type === "type2" ? "white" : "black"}` }}
        >
          {title}
        </h2>
      </nav>
      {children}
      {/* <ToastContainer /> */}
    </Page>
  );
};

export default PageLayout;
