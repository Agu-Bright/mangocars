import { useState, useContext } from "react";
import PageLayout from "../../components/App/PageLayout";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../../data";
import { CarContext } from "../../components/context/CarContext";

const Name = ({ f7router }) => {
  const { setAuth } = useContext(CarContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = async () => {
    if (!firstName || !lastName) {
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
      const { data } = await axios.put(
        `${URL}/me/update2`,
        { firstName, lastName },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      setAuth(data?.user);
      f7router.navigate("/profile");
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
    <PageLayout title={"Edit Name"} f7router={f7router}>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium">First Name</label>
          <input
            className="bg-zinc-100 border-zinc-200 border-2 px-4 py-3 w-full rounded-md"
            placeholder="John"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Last Name</label>
          <input
            className="bg-zinc-100 border-zinc-200 border-2 px-4 py-3 w-full rounded-md"
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4"
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </PageLayout>
  );
};

export default Name;
