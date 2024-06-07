import { useContext, useEffect, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import { Stack, Avatar } from "@mui/material";
import noNotfiy from "../assets/noNotify.svg";
import axios from "axios";
import { URL } from "../data";
import { CarContext } from "../components/context/CarContext";
import login from "../assets/login.svg";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import DeliveryModal from "../components/App/Modal";

function getday(date) {
  dayjs.extend(relativeTime);
  const a = dayjs(Date.now());
  return dayjs(date).from(a);
}

const Notification = ({ f7router }) => {
  const { setAuthOpen, auth } = useContext(CarContext);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState({});
  useEffect(() => {
    //get my notification
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/my-notifications`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(data);
        setNotifications(data?.notifications);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (notification) => {
    console.log(notification);

    if (notification?.type === "delivered") {
      setSelectedNotification(notification);
      console.log("delivered");
      handleOpen();
    }
  };

  if (!auth) {
    return (
      <PageLayout title={"Notifications"} f7router={f7router}>
        <div className="px-4">
          <div
            style={{
              height: "70vh",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={login} alt="no-favourite" />
            <p
              style={{
                paddingTop: "55px",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              You are not authenticated{" "}
            </p>
            <button
              onClick={() => setAuthOpen(true)}
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
              Sign In
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={"Notifications"} f7router={f7router}>
      <ul
        className="p-4 flex flex-col gap-4"
        style={{
          // background: "#EEF7F0",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          borderTop: "1px solid #f4f0f0",
        }}
      >
        {notifications.length > 0 &&
          notifications.map((item, index) => (
            <li
              key={index}
              style={{
                height: "69px",
                marginBottom: "2px",
                background: "#EEF7F0",
              }}
              onClick={() => handleClick(item)}
            >
              <Stack
                direction="row"
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  padding: "3px",
                  background: `${index === 3 ? "#109323" : ""}`,
                }}
              >
                <div
                  style={{
                    width: "13%",
                    height: "100%",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                >
                  {item?.sender[0]?.avatar ? (
                    <>
                      {
                        <Avatar
                          src={item?.sender[0]?.avatar?.url}
                          alt="avatar"
                          sx={{ border: "0.1px solid gray" }}
                        />
                      }
                    </>
                  ) : (
                    <>
                      {
                        <Avatar>
                          {item?.sender[0]?.name.split(" ")[0].split("")[0]}
                        </Avatar>
                      }
                    </>
                  )}
                </div>
                <Stack
                  direction="column"
                  spacing={0}
                  sx={{
                    width: "70%",
                    height: "100%",
                    display: "flex",
                    alignItems: "start",
                    // justifyContent: "flex-start",
                    marginLeft: "15px",
                    marginRight: "5px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ color: `${index === 3 ? "white" : ""}` }}>
                    <span
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {item?.title},
                    </span>{" "}
                    {item?.description}
                  </p>
                  <p
                    style={{
                      color: `${index === 3 ? "white" : "#7A7676"} `,
                      marginTop: "5px",
                    }}
                  >
                    {getday(item?.createdAt)}
                  </p>
                </Stack>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Avatar
                    src={item?.product?.images[0].url}
                    sx={{
                      borderRadius: "5px",
                      width: "70px",
                      height: "70px",
                      border: "0.1px solid gray",
                    }}
                  />
                </div>
              </Stack>
            </li>
          ))}

        {!notifications ||
          (notifications.length === 0 && (
            <div
              style={{
                height: "100vh",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img src={noNotfiy} alt="no-favourite" />
              <p
                style={{
                  paddingTop: "55px",
                  fontWeight: "800",
                  fontSize: "20px",
                }}
              >
                You have no Notificaion yet
              </p>
              <button
                onClick={() => f7router.navigate(`/home`)}
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
                Home{" "}
              </button>
            </div>
          ))}
      </ul>
      <DeliveryModal
        handleClose={handleClose}
        open={open}
        notification={selectedNotification}
      />
    </PageLayout>
  );
};

export default Notification;
