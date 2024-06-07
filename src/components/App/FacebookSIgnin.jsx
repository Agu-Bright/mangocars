// import { useState } from "react";
import axios from "axios";
import { auth, facebookProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { URL } from "../../data";
import { useContext } from "react";
import { CarContext } from "../context/CarContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

const FacebookSignin = ({ type, handleOpen }) => {
  //   const [values, setValues] = useState();
  const { setAuth } = useContext(CarContext);

  const handleFacebookSignIn = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    console.log("Google sign-in successful:", user);
    if (type === "signup") {
      try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log("Google sign-in successful:", user);
        //    Handle user authentication or redirect to the next stepu
        try {
          const { data } = await axios.post(
            `${URL}/register`,
            {
              fullName: user?.displayName,
              password: user?.uid,
              email: user?.email,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAuth(data?.user);
          handleOpen();
        } catch (error) {
          handleOpen();

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
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
      }
    } else {
      try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log("Google sign-in successful:", user);

        //    Handle user authentication or redirect to the next stepu
        try {
          const { data } = await axios.post(
            `${URL}/login`,
            {
              password: user?.uid,
              email: user?.email,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAuth(data?.user);
          handleOpen();
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
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
    }
  };

  return (
    <button
      className="border border-zinc-600 rounded p-2"
      onClick={handleFacebookSignIn}
    >
      Facebook
    </button>
  );
};

export default FacebookSignin;