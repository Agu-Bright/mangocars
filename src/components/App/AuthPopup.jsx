import { Page, Popup } from "framework7-react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { URL } from "../../data";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { CarContext } from "../context/CarContext";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignin from "./FacebookSIgnin";
import AppleSignIn from "./AppleSIgnIn";

function AuthPopup({ authOpen, setAuthOpen }) {
  const { auth, setAuth, state, setState } = useContext(CarContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSubmit = async (e, _user) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/register`, _user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuth(data?.user);
      setLoading(false);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
      handleOpen();
    } catch (error) {
      setLoading(false);
      handleOpen();
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

  const [loadinglog, setLoadingLog] = useState(false);

  const handlesignin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required", {
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
    setLoadingLog(true);
    try {
      const { data } = await axios.post(
        `${URL}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      setAuth(data?.user);
      handleOpen();
      setEmail("");
      setPassword("");
      setLoadingLog(false);
    } catch (error) {
      console.log(error);
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
      setLoadingLog(false);
    }
  };

  const handleOpen = () => {
    setState("unauthenticated");
    setAuthOpen(false);
  };

  return (
    <>
      <Popup
        swipeToClose="to-bottom"
        className={`h-[440px] fixed top-auto bottom-0 rounded-t-md`}
        opened={authOpen}
        onPopupClose={() => handleOpen()}
      >
        {state === "signup" && (
          <Page className="">
            <div className="sign_up_pop">
              <div className="grid grid-cols-2 gap-5 w-full cool_height">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    style={{
                      border: "1px solid #d9d4d4",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    placeholder="John"
                    className="py-2 px-4 w-full rounded border cool_item_height"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    style={{
                      border: "1px solid #d9d4d4",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    placeholder="Doe"
                    className="py-2 px-4 w-full rounded border cool_item_height"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 w-full cool_height">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="py-2 px-4 w-full rounded border cool_item_height"
                    name="email"
                    style={{
                      border: "1px solid #d9d4d4",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    placeholder="example@gmail.com"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="number"
                    className="py-2 px-4 w-full rounded border cool_item_height"
                    name="phoneNumber"
                    placeholder="07011111121"
                    style={{
                      border: "1px solid #d9d4d4",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    value={user.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full cool_height">
                <label htmlFor="">Password</label>
                <input
                  className="py-2 px-4 w-full rounded border cool_item_height"
                  type="password"
                  name="password"
                  style={{
                    border: "1px solid #d9d4d4",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full cool_height">
                <label htmlFor="">Confirm Pasword</label>
                <input
                  className="py-2 px-4 w-full rounded border cool_item_height"
                  type="password"
                  name="confirmPassword"
                  style={{
                    border: "1px solid #d9d4d4",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                onClick={(e) => handleSubmit(e, user)}
                className="w-full bg-primary text-white font-semibold text-lg rounded py-4"
              >
                {!loading && "Sign Up"}
                {loading && (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                )}
              </button>
            </div>
          </Page>
        )}
        {state === "signin" && (
          <Page className="">
            <div
              style={{
                height: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px  10px",
              }}
            >
              <div
                className="flex flex-col gap-1 w-full cool_height"
                style={{ height: "30%" }}
              >
                <label htmlFor="">Email</label>
                <input
                  className="py-2 px-4 w-full rounded border cool_item_height"
                  type="email"
                  name="email"
                  style={{
                    border: "1px solid #d9d4d4",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div
                className="flex flex-col gap-1 w-full cool_height"
                style={{ height: "30%" }}
              >
                <label htmlFor="">Password</label>
                <input
                  className="py-2 px-4 w-full rounded border cool_item_height"
                  type="password"
                  name="password"
                  style={{
                    border: "1px solid #d9d4d4",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                onClick={handlesignin}
                className="w-full bg-primary text-white font-semibold text-lg rounded py-4"
              >
                {!loadinglog && "Sign In"}
                {loadinglog && (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                )}
              </button>
            </div>
          </Page>
        )}
        {state === "unauthenticated" && (
          <Page className="">
            <div className="p-4 grid grid-rows-2 gap-4 h-full">
              <div className="flex flex-col gap-4 font-semibold">
                <h3 className="font-bold">Sign in</h3>
                <div className="grid grid-cols-2 gap-4 h-max">
                  <GoogleSignIn type="signin" handleOpen={handleOpen} />
                  {/* <button className="border border-zinc-600 rounded p-2">
                    Facebook
                  </button> */}
                  <FacebookSignin />
                </div>
                {/* <button className="bg-black text-white rounded p-2">
                  Sign in with apple
                </button> */}
                <AppleSignIn type="signin" handleOpen={handleOpen} />
                <button
                  className="bg-primary text-white rounded p-2"
                  onClick={() => {
                    setState("signin");
                  }}
                >
                  Email or phone number
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-bold">Sign up</h3>
                <div className="grid grid-cols-2 gap-4 h-max">
                  <GoogleSignIn type="signup" handleOpen={handleOpen} />
                  <FacebookSignin />
                </div>
                <AppleSignIn type="signin" handleOpen={handleOpen} />

                <button
                  className="bg-primary text-white rounded p-2"
                  onClick={() => setState("signup")}
                >
                  Email or phone number
                </button>
              </div>
            </div>
          </Page>
        )}
      </Popup>
      {/* <ToastContainer /> */}
    </>
  );
}

export default AuthPopup;
