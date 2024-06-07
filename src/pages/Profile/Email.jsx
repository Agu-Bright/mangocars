import { useState, useContext } from "react";
import PageLayout from "../../components/App/PageLayout";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../../data";
import { CarContext } from "../../components/context/CarContext";

const Email = ({ f7router }) => {
  const { setAuth } = useContext(CarContext);

  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (!email) {
      toast.error("First and Last Names required", {
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
        `${URL}/update-email`,
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      console.log(data);
      // setAuth(data?.user);
      // f7router.navigate("/profile");
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

  return (
    <PageLayout title={"Edit Email"} f7router={f7router}>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Your Email</label>
          <input
            className="bg-zinc-100 border-zinc-200 border-2 px-4 py-3 w-full rounded-md"
            placeholder="exapmele@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p style={{ fontWeight: "500", fontSize: "12px" }}>
          We’ll send an email to verify your address.
        </p>
        <p style={{ fontWeight: "500", fontSize: "12px", color: "#CE0404" }}>
          We can’t send the verification email now. Please try again after 3
          hours.{" "}
        </p>
        <button
          onClick={() => handleSubmit()}
          className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4"
        >
          Verify Email
        </button>
      </div>
      <ToastContainer />
    </PageLayout>
  );
};

export default Email;
