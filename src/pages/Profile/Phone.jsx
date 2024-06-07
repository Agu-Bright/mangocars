import { useEffect, useState } from "react";
import PageLayout from "../../components/App/PageLayout";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { SiWhatsapp } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../../data";
import { CircularProgress } from "@mui/material";
// import { CarContext } from "../../components/context/CarContext";

const Phone = ({ f7router }) => {
  const [sms, setSms] = useState(true);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verify, setVerify] = useState(true);
  const [count, setCount] = useState(120);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ status: false, msg: "" });

  //   const { setAuth } = useContext(CarContext);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/nigeria").then((res) =>
      res.json().then((data) => setCountry(data))
    );
    return () => setErrorMsg({ status: false, msg: "" });
  }, []);

  useEffect(() => {
    if (count > 0) {
      const timeoutId = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 2000);

      return () => {
        clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the count changes
      };
    }
  }, [count]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast.error("Phone Number is required", {
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
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/send-otp`,
        { phoneNumber, sms },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      if (data?.success) {
        toast.success("OTP sent", {
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
      }
      setLoading(false);
      setVerify(false);
      //   setAuth(data?.user);
      //   f7router.navigate("/profile");
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
    }
  };
  // function handleInputChange() {
  //   console.log("hiii");
  //   const inputField = document.getElementById("partitioned");
  //   const inputValue = inputField.value;

  //   // Check if input length is 6 characters
  //   if (inputValue.length === 6) {
  //     // Set the selection range to prevent moving the cursor
  //     inputField.setSelectionRange(6, 6);
  //   }
  // }

  const handleVerifyOtp = async () => {
    try {
      setVerifying(true);
      const { data } = await axios.post(
        `${URL}/verify-otp`,
        {
          phoneNumber,
          otp,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setVerifying(false);

      console.log(data);
      f7router.navigate("/profile");
      toast.success(data?.message, {
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
    } catch (error) {
      setVerifying(false);
      setErrorMsg({ status: true, msg: error?.response?.data?.message });

      toast.error(error?.response?.data?.message, {
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
      console.log(error);
    }
  };
  return (
    <PageLayout title={"Edit Phone"} f7router={f7router}>
      <div className="p-4 flex flex-col gap-4">
        {verify && (
          <>
            <div className="flex flex-col gap-1">
              <label className="font-medium">
                We’ll send a code for verification
              </label>
              <div className="relative flex bg-zinc-100 border-2 border-zinc-200 rounded overflow-clip ">
                <div className="py-3 px-4 m-0 border-r-2 border-zinc-200 h-full flex justify-center items-center gap-2">
                  <img
                    src={country && country[0]?.flags.svg}
                    className="w-6"
                    alt=""
                  />
                  <ChevronDownIcon className="h-6" />
                </div>
                <input
                  className="px-4 bg-transparent py-3 w-full rounded-md"
                  placeholder="09000000000"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => setSms(true)}
              className={`text-start flex items-center gap-4 border-2 ${
                sms ? "border-primary" : ""
              } rounded px-4 py-2`}
            >
              <ChatBubbleBottomCenterTextIcon className="h-6 text-zinc-600" />{" "}
              <div className="flex flex-col">
                <h6 className="text-base">Get a code via SMS</h6>
                <p className="text-xs text-zinc-500">
                  Standard text messaging rates may apply
                </p>
              </div>
            </button>
            <button
              onClick={() => setSms(false)}
              className={`text-start flex items-center gap-4 border-2 rounded px-4 py-2 ${
                !sms ? "border-primary" : ""
              }`}
            >
              <SiWhatsapp className="text-2xl text-zinc-600" />{" "}
              <div className="flex flex-col">
                <h6 className="text-base">Get a code via Whatsapp</h6>
                <p className="text-xs text-zinc-500">
                  We would not send anything without your consent
                </p>
              </div>
            </button>
            {!loading && (
              <button
                onClick={handleSendOtp}
                className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4"
              >
                Verify
              </button>
            )}
            {loading && (
              <button className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4">
                <CircularProgress size={20} sx={{ color: "white" }} />
              </button>
            )}
          </>
        )}
        {!verify && (
          <>
            <div
              id="divOuter"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div id="divInner">
                <label className="font-medium">
                  Input your verification code
                </label>
                <input
                  style={{
                    marginTop: "5px",
                    fontWeight: "600",
                  }}
                  id="partitioned"
                  type="text"
                  maxLength="6"
                  onChange={(e) => setOtp(e.target.value)}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1");
                  }}
                  onKeyPress={(e) => {
                    if (e.target.value.length === 4) return false;
                  }}
                />
              </div>
            </div>
            {errorMsg.status && (
              <p style={{ color: "red", margin: "10px " }}>{errorMsg?.msg}</p>
            )}

            {!verifying && (
              <button
                onClick={() => handleVerifyOtp()}
                className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4"
              >
                Verify
              </button>
            )}
            {verifying && (
              <button className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4">
                <CircularProgress size={20} sx={{ color: "white" }} />
              </button>
            )}
            {/* <button
              onClick={handleSendOtp}
              className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4"
            >
              {count}
            </button> */}
          </>
        )}
      </div>
      <ToastContainer />
    </PageLayout>
  );
};

export default Phone;
