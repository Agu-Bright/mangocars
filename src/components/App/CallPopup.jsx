import { HandThumbUpIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { CircularProgress, Rating } from "@mui/material";
import { Page, Popup } from "framework7-react";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { URL } from "../../data";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
function CallPopup({ callOpen, setCallOpen, car, type }) {
  const handleCallClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [sending, setSending] = useState(false);

  const handleSendReview = async (_id, _rating, _comment) => {
    try {
      setSending(true);
      await axios.put(
        `${URL}/review`,
        {
          rating: _rating,
          comment: _comment,
          productId: _id,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setCallOpen(false);
      toast.success("Review Sent", {
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
      setRating();
      setComment();
      setSending(false);
    } catch (error) {
      console.log(error);
      setSending(false);
    }
  };

  return (
    <Popup
      swipeToClose="to-bottom"
      className="h-[320px] fixed top-auto bottom-0 rounded-t-md"
      opened={callOpen}
      onPopupClose={() => setCallOpen(false)}
    >
      {car && type !== "comment" && (
        <Page className="bg-green-100 text-base">
          <div className="p-4 h-full flex flex-col gap-4">
            <h4 className="text-lg font-semibold"> {car?.user?.name} </h4>
            <div className="flex bg-white rounded justify-between items-center p-2">
              <p className="px-4 w-max font-medium">{car?.user?.phoneNumber}</p>
              <button className="rounded bg-primary w-max h-max text-zinc-100 p-2 aspect-square">
                <PhoneIcon
                  className="h-6 w-6"
                  onClick={() => handleCallClick(car?.user?.phoneNumber)}
                />
              </button>
            </div>
            <hr className="border-green-300 my-auto" />

            <div className="bg-green-200 rounded p-4 flex flex-col gap-4 font-medium">
              <div className="flex gap-4 ">
                <div className="w-6">
                  <ShieldExclamationIcon className="h-6 text-red-600" />
                </div>
                Ensure you see your car before making payments
              </div>
              <div className="flex gap-4 ">
                <div className="w-6">
                  <HandThumbUpIcon className="h-6 text-primary" />
                </div>{" "}
                Ensure you see your car before making payments
              </div>
            </div>
          </div>
        </Page>
      )}
      {car && type === "comment" && (
        <Page className="bg-green-100 text-base">
          <div className="p-4 h-full flex flex-col gap-4">
            <h4 className="text-lg font-semibold"> Review this Car</h4>
            <Rating
              name="read-only"
              size="small"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              precision={0.5}
              // sx={{
              //   color: "#535353 !important",
              // }}
            />
            {rating && (
              <div className="flex bg-white rounded justify-between items-center p-2">
                <p className="px-4 w-max font-medium">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment"
                  />
                </p>
                {!sending && (
                  <button className="rounded bg-primary w-max h-max text-zinc-100 p-2 aspect-square">
                    <SendIcon
                      className="h-6 w-6"
                      onClick={() =>
                        handleSendReview(car?._id, rating, comment)
                      }
                    />
                  </button>
                )}
                {sending && (
                  <button className="rounded bg-primary w-max h-max text-zinc-100 p-2 aspect-square">
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  </button>
                )}
              </div>
            )}
            {/* <hr className="border-green-300 my-auto" />

            <div className="bg-green-200 rounded p-4 flex flex-col gap-4 font-medium">
              <div className="flex gap-4 ">
                <div className="w-6">
                  <ShieldExclamationIcon className="h-6 text-red-600" />
                </div>
                Ensure you see your car before making payments
              </div>
              <div className="flex gap-4 ">
                <div className="w-6">
                  <HandThumbUpIcon className="h-6 text-primary" />
                </div>{" "}
                Ensure you see your car before making payments
              </div>
            </div> */}
          </div>
        </Page>
      )}
    </Popup>
  );
}

export default CallPopup;
