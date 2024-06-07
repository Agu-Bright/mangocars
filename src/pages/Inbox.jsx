import { Avatar, CircularProgress, Divider, Stack } from "@mui/material";
import { Tab } from "framework7-react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../data";
import { CarContext } from "../components/context/CarContext";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import noChat from "../assets/noChat.svg";

const Inbox = ({ f7router }) => {
  const { auth, setSelectedChat, setAuthOpen } = useContext(CarContext);
  const [myChats, setMyChats] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [state, setState] = useState(false);

  myChats && console.log(myChats);
  console.log(f7router.currentRoute);
  //fetch chats
  useEffect(() => {
    auth &&
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${URL}/fetch-chats`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          setMyChats(data?.data?.results);
          setLoading(false);
          console.log(data);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })();
  }, []);

  const getSender = (auth, users) => {
    if (users[0]?.name === users[1]?.name) {
      return users[0]?.name;
    }
    const user = users.find((item) => item?._id !== auth?._id);
    console.log(user);
    return user?.name;
  };
  const getSenderImg = (auth, users) => {
    if (users[0]?.name === users[1]?.name) {
      return users[0]?.name.split(" ")[0].split("")[0];
    }
    const user = users.find((item) => item?._id !== auth?._id);
    console.log(user);
    return user?.name.split(" ")[0].split("")[0];
  };
  const getSenderId = (auth, users) => {
    if (users[0]?.name === users[1]?.name) {
      return auth?._id;
    }
    const user = users.find((item) => item?._id !== auth?._id);
    console.log(user);
    return user?._id;
  };

  const handleAccessChat = async (id, carId) => {
    try {
      //access chat
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/access`,
        {
          userId: id,
          car: carId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedChat(data);
      setLoading(false);
      f7router.navigate("/chat/" + carId);
    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  return (
    <Tab id="inbox" className="page-content">
      <nav className="flex gap-4 p-4 text-lg text-center items-center bg-zinc-100 font-bold">
        <h2>Inbox</h2>
      </nav>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "green" }} />
        </div>
      )}
      {!loading && myChats.length > 0 && (
        <>
          <div className="p-4">
            <input
              className="p-2 "
              style={{
                borderRadius: "15px",
                padding: "10px",
                background: "#EEF7F0",
              }}
              id="inbox_search"
              type="text"
              placeholder="search"
            />
          </div>
          <ul className="p-4 flex flex-col gap-4">
            {myChats.map((item, index) => (
              <>
                <li
                  key={index}
                  style={{
                    height: "69px",
                  }}
                  onClick={() =>
                    handleAccessChat(
                      getSenderId(auth, item?.users),
                      item?.product
                    )
                  }
                >
                  <Stack
                    direction="row"
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "13%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <Avatar>{getSenderImg(auth, item?.users)}</Avatar>
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
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ fontWeight: "700" }}>
                        {" "}
                        {getSender(auth, item?.users)}
                      </p>
                      <p>{item?.latestMessage?.content} </p>
                      <p style={{ color: "#7A7676", marginTop: "5px" }}>
                        Feb 10
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
                      <ArrowForwardIosIcon sx={{ color: "#A6A1A1" }} />
                    </div>
                  </Stack>
                </li>
                <Divider />
              </>
            ))}
          </ul>
        </>
      )}
      {!loading && myChats.length === 0 && (
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
            <img src={noChat} alt="no-favourite" />
            <p
              style={{
                paddingTop: "55px",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              No Chat{" "}
            </p>
            <button
              onClick={() => f7router.navigate("/home")}
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
              Explore{" "}
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </Tab>
  );
};

export default Inbox;
