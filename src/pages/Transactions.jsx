import { useContext, useEffect, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import { moneyFormat } from "../functions";
import { CarContext } from "../components/context/CarContext";
import login from "../assets/login.svg";
import axios from "axios";
import { URL } from "../data";
function formatDateString(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the date into the desired string format
  return `${month} ${day}, ${year}`;
}

const Transactions = ({ f7router }) => {
  const { auth, setAuthOpen } = useContext(CarContext);
  const [myOrders, setMyOrders] = useState([]);
  myOrders && console.log(myOrders);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${URL}/orders/me`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(data);
        setMyOrders(data?.orders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  if (!auth) {
    return (
      <PageLayout title={"Transaction History"} f7router={f7router}>
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
            <img src={login} alt="no-favourite" />
            <p
              style={{
                paddingTop: "55px",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              You are not authenticated{" "}
            </p>
            <button
              onClick={() => setAuthOpen(true)}
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
              Sign In
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }
  if (myOrders.length === 0 && !loading) {
    return (
      <PageLayout title={"Transaction History"} f7router={f7router}>
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
            <img src={login} alt="no-favourite" />
            <p
              style={{
                paddingTop: "55px",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              You have no payment History{" "}
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
      </PageLayout>
    );
  }
  return (
    <PageLayout f7router={f7router} title={"Transaction History"}>
      <div className="p-4">
        <h2 className="text-lg font-bold">Mango Cars Balance</h2>
        <p className="text-lg font-bold text-primary">{moneyFormat(0)}</p>
        <hr className="border-2 my-4" />
        <h5 className="font-semibold text-zinc-500">
          {" "}
          {myOrders.length} transactions
        </h5>

        <ul className="flex flex-col gap-2 py-4">
          {myOrders.map((order) => {
            return (
              <li
                onClick={() => f7router.navigate(`/reciept/${order?._id}`)}
                key={order?._id}
                className="bg-zinc-100 rounded p-4 w-full"
              >
                <div className="flex justify-between text-base font-semibold gap-4">
                  <p>
                    Mango cars transaction for{" "}
                    {order?.sellers?.brandName || order?.sellers?.name} to{" "}
                    {order?.sellers?.brandName || order?.sellers?.name}
                  </p>
                  <p className="text-primary">
                    {moneyFormat(order?.itemsPrice)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-zinc-500">
                  {" "}
                  {formatDateString(order?.createdAt)}{" "}
                </p>
              </li>
            );
          })}
          {/* <li className="bg-zinc-100 rounded p-4 w-full">
            <div className="flex justify-between text-base font-semibold gap-4">
              <p>Mango cars transaction for Eke’s autos to Simisola Gbeke</p>
              <p className="text-primary">{moneyFormat(1000000)}</p>
            </div>
            <p className="text-sm font-semibold text-zinc-500"> Feb 10, 2024</p>
          </li> */}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Transactions;
