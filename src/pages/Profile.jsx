import {
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Avatar } from "@mui/material";
import { Link } from "framework7-react";
import PageLayout from "../components/App/PageLayout";
import axios from "axios";
import { URL } from "../data";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { CarContext } from "../components/context/CarContext";
const Profile = ({ f7router }) => {
  const { auth, setAuth, setState } = useContext(CarContext);

  //logout
  const logOutUser = async () => {
    try {
      const { data } = await axios.get(`${URL}/logout`, {
        withCredentials: true,
      });
      console.log(data);
      setState("unauthenticated");
      setAuth(null);
      f7router.navigate("/home");
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
    }
  };

  return (
    <PageLayout title={"Profile"} f7router={f7router}>
      <div
        onClick={() => f7router.navigate("/profile")}
        className="p-4 w-max h-max bg-zinc-200 text-zinc-500 rounded-full aspect-square mx-auto my-14 relative overflow-clip"
      >
        <Avatar
          sx={{
            width: "70px",
            height: "70px",
            background: "#223822",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            fontSize: "2em",
          }}
        >
          {auth?.name[0].toUpperCase()}
        </Avatar>{" "}
        {/* <div className="absolute bottom-0 left-0 bg-zinc-700/70 text-zinc-50 text-sm w-full text-center font-medium py-0.5">
          Edit
        </div> */}
      </div>
      <ul className="font-medium text-zinc-700">
        <li className="flex gap-4 p-4 border-b border-b-zinc-300 items-center">
          <UserIcon className="h-5" /> <h6>{auth?.name}</h6>
          <Link href="/profile/name" className="text-primary ml-auto ">
            Edit
          </Link>
        </li>
        <li className="flex gap-4 p-4 border-b border-b-zinc-300 items-center">
          <EnvelopeIcon className="h-5" /> <h6>{auth?.email}</h6>
          <Link href="/profile/email" className="text-primary ml-auto ">
            Edit
          </Link>
        </li>
        <li className="flex gap-4 p-4 border-b border-b-zinc-300 items-center">
          <PhoneIcon className="h-5" />{" "}
          <h6>{auth?.phoneNumber ? auth?.phoneNumber : "No Number"}</h6>
          <Link href="/profile/phone" className="text-primary ml-auto ">
            Edit
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-4 flex justify-center w-full">
        <button
          className="text-base font-medium text-primary flex items-center w-max gap-2"
          onClick={() => logOutUser()}
        >
          <ArrowRightOnRectangleIcon className="h-5" />
          Logout
        </button>
      </div>
      <ToastContainer />
    </PageLayout>
  );
};

export default Profile;
