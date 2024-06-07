import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Page } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import { URL } from "../data";
import { moneyFormat } from "../functions";
import CallPopup from "../components/App/CallPopup";
import axios from "axios";
import { Avatar, CircularProgress } from "@mui/material";
import { CarContext } from "../components/context/CarContext";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

const Chat = ({ f7router, f7route }) => {
  //cars id
  const { id } = f7route.params;
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(false);
  const { selectedChat, auth } = useContext(CarContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log(messages);
  console.log(selectedChat);
  //get single product
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${URL}/product/${id}`);
        setCar(data?.product);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    //fetchmessages
    (async () => {
      try {
        const { data } = await axios.get(
          `${URL}/get-all-messages/${selectedChat?._id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data?.data?.messages);
        setMessages(data?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedChat]);

  const handleSendMessage = async (msg, chat) => {
    if (!msg) {
      toast.error("Empty message", {
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
      return;
    }
    if (!chat?._id) {
      toast.error("Refresh this page", {
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
      return;
    }
    try {
      const { data } = await axios.post(
        `${URL}/send-message`,
        {
          content: msg,
          chatId: chat?._id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewMessage("");
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };
  // const { title, price, image } = cars[id];

  //   const [chats, setChats] = useState([]);

  console.log("msg", newMessage);

  const [callOpen, setCallOpen] = useState(false);

  return (
    <Page className="bg-zinc-100">
      <CallPopup callOpen={callOpen} setCallOpen={setCallOpen} car={car} />{" "}
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
      {!loading && car && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col overflow-hidden">
          <nav className="p-4 bg-primary text-zinc-100  flex items-center gap-2">
            <ChevronLeftIcon
              onClick={() => {
                f7router.back();
              }}
              className="h-6 relative"
            />
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-zinc-200 text-zinc-600 p-2">
                {/* <UserIcon className="h-6" /> */}
                <Avatar>{car?.user?.name.split(" ")[0].split("")[0]}</Avatar>
              </div>
              <div className="flex flex-col justify-evenly font-semibold text-sm">
                <h2 className="">{car?.user?.name} Motors</h2>
                {/* <small className="text-green-200">Online</small> */}
              </div>
            </div>
            <PhoneIcon
              onClick={() => {
                setCallOpen(true);
              }}
              className="h-6 ml-auto relative"
            />
          </nav>
          <div className="px-10 py-4 bg-green-200 text-zinc-600  flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <img
                src={car?.images[0].url}
                className="h-10 aspect-[7/5] rounded"
                alt="car image"
              />
              <div className="flex flex-col justify-evenly font-semibold text-sm">
                <h2 className="">{car?.name}</h2>
                <small className="text-primary">
                  {moneyFormat(car?.price)}
                </small>
              </div>
            </div>
          </div>
          <div className="h-full overflow-y-auto">
            {messages != undefined && messages.length > 0 && (
              <ul className="p-4 flex flex-col gap-2 font-medium text-zinc-600">
                {messages?.map((msg) => (
                  <li
                    key={msg?._id}
                    className={
                      auth?._id === msg?.sender?._id ? "sender" : "receiver"
                    }
                  >
                    {msg?.content}
                  </li>
                ))}
                <li id="bottom" className="mt-10"></li>
              </ul>
            )}
          </div>

          <div className="px-4">
            <div className="border py-2 px-4 border-zinc-500 rounded text-xs flex gap-1 text-zinc-500">
              <ShieldExclamationIcon className="h-4" /> Ensure you see your car
              before making payments
            </div>
          </div>

          <div className="w-full bg-zinc-100 p-2">
            <form
              //   onSubmit={(e) => {
              //     e.preventDefault();
              //     if (message) {
              //       setChats([...chats, { message, sender: 1 }]), setMessage("");
              //     }
              //   }}
              className="relative flex gap-2"
            >
              <input
                placeholder="Message..."
                className="w-full py-2 pl-4 pr-12 text-base rounded font-medium bg-zinc-200 placeholder:text-zinc-400"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSendMessage(newMessage, selectedChat);
                }}
                className="rounded bg-primary text-zinc-100 p-2 w-max"
              >
                <PaperAirplaneIcon className="h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </Page>
  );
};

export default Chat;
