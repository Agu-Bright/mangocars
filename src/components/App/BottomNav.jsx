import {
  Cart,
  ChatBubble,
  House,
  Person,
  Wallet,
} from "framework7-icons/react";
import { ToastContainer } from "react-toastify";

import { Link } from "framework7-react";
import { useContext } from "react";
import AuthPopup from "./AuthPopup";
import { CarContext } from "../context/CarContext";
import AddIcon from "@mui/icons-material/Add";

const BottomNav = ({ f7router }) => {
  // const [authOpen,setAuthOpen]=useState(false)
  const { authOpen, setAuthOpen, state, activeTab, setActiveTab, auth } =
    useContext(CarContext);
  auth && console.log(auth);
  return (
    <>
      <div
        // style={{ position: "relative" }}
        className={`fixed bottom-0 left-0 w-full z-[5000] text-zinc-500 transition-all`}
      >
        {(auth?.role === "seller" || auth?.role === "admin") && (
          <div
            onClick={() => f7router.navigate("/post")}
            style={{
              width: "50px",
              height: "50px",
              border: "0.1px solid gray",
              background: "green",
              marginLeft: "20px",
              marginBottom: "15px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddIcon
              sx={{ color: "white", fontWeight: "800", fontSize: "2em" }}
            />
          </div>
        )}
        <nav
          // onTouchStart={(e) => handleTouchStart(e, "nav")}
          // onTouchEnd={handleTouchEnd}
          className={`flex justify-evenly transition-all w-full h-max py-2 bg-zinc-100 border-t-2 border-y-2 border-zinc-300 rounded-t-xl relative`}
        >
          <Link
            onClick={() => setActiveTab(0)}
            tabLink="#home"
            className={`flex flex-col text-[11px] ${
              activeTab == 0 ? "text-primary" : ""
            }`}
          >
            <House className="text-xl" />
            Home
          </Link>
          <Link
            tabLink="#orders"
            onClick={() => setActiveTab(1)}
            className={`flex flex-col text-[11px] ${
              activeTab == 1 ? "text-primary" : ""
            }`}
          >
            <Cart className="text-xl" />
            Orders
          </Link>
          <Link
            tabLink="#inbox"
            onClick={() => setActiveTab(2)}
            className={`flex flex-col text-[11px] ${
              activeTab == 2 ? "text-primary" : ""
            }`}
          >
            <ChatBubble className="text-xl" />
            Inbox
          </Link>
          <Link
            onClick={() => f7router.navigate("/transactions")}
            // tabLink="#payments"
            className={`flex flex-col text-[11px] ${
              activeTab == 3 ? "text-primary" : ""
            }`}
          >
            <Wallet className="text-xl" />
            Payment
          </Link>
          <Link
            onClick={() =>
              state === "authenticated"
                ? f7router.navigate("/profile")
                : setAuthOpen(true)
            }
            // tabLink="#profile"
            className={`flex flex-col text-[11px] ${
              activeTab == 4 ? "text-primary" : ""
            }`}
          >
            <Person className="text-xl" />
            Profile
          </Link>
        </nav>
      </div>
      <AuthPopup
        f7router={f7router}
        authOpen={authOpen}
        setAuthOpen={setAuthOpen}
      />
      <ToastContainer />
    </>
  );
};

export default BottomNav;
