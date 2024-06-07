import { TrashIcon } from "@heroicons/react/20/solid";
import { Button, Tab } from "framework7-react";
import { URL } from "../data";
import { moneyFormat } from "../functions";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "../components/context/CarContext";
import axios from "axios";
import no_order from "../assets/no_order.svg";
import InitializePayment from "../components/InitializePayment";

const Orders = ({ f7router }) => {
  const totalPrices = (items) => {
    let total = 0;
    items.forEach((item) => (total += item.price));
    return total;
  };
  const { auth, activeTab } = useContext(CarContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    auth &&
      (async () => {
        try {
          const { data } = await axios.get(`${URL}/get-cart`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(data);
          setOrders(data?.user?.cartProducts);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [auth, activeTab]);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.get(`${URL}/remove-cart/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (data?.success) {
        setOrders(data?.user?.cartProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(totalPrices(orders));
  }, [orders]);

  return (
    <Tab id="orders" className="page-content pb-20">
      <nav className="flex gap-4 p-4 text-lg text-center items-center bg-zinc-100 font-bold">
        <h2>Orders</h2>
      </nav>
      {orders.length > 0 && (
        <>
          <ul className="p-4 flex flex-col gap-4">
            {orders.map((order) => (
              <li key={order?._id} className="flex gap-2">
                <img
                  src={order?.images[0].url}
                  className="aspect-[7/5] w-1/2 rounded"
                  alt=""
                />
                <div className="flex flex-col">
                  <h4 className="font-semibold text-lg">{order?.name}</h4>

                  <p className="text-primary text-base font-medium">
                    {moneyFormat(order?.price)}
                  </p>
                  <button
                    onClick={() => handleRemove(order?._id)}
                    className="flex items-center text-red-500 mt-auto"
                  >
                    <TrashIcon className="h-4" />
                    Remove
                  </button>
                </div>
                <hr className="mt-2" />
              </li>
            ))}
          </ul>
          <section className="p-4">
            <h4 className="text-lg font-semibold">Summary</h4>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-base font-semibold mt-2">
              <h6 className="text-zinc-500">Subtotal</h6>
              <p>{moneyFormat(subtotal)}</p>

              <h6 className="text-zinc-500">tax</h6>
              <p>{moneyFormat((1.5 / 100) * subtotal + 100)}</p>

              <h6 className="font-bold">Total</h6>
              <p className="font-bold text-primary">
                {moneyFormat((1.5 / 100) * subtotal + 100 + subtotal)}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <button
                onClick={() =>
                  initializePayment((ref) => {
                    console.log(ref);
                  })
                }
                className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4 p-5"
              >
                Make Payment
              </button> */}
              <InitializePayment
                amount={Number(((1.5 / 100) * subtotal + 100 + subtotal) * 100)}
                email={auth?.email}
                item={orders}
                f7router={f7router}
                handleRemove={handleRemove}
              />
            </div>
          </section>
        </>
      )}

      {!orders ||
        (orders.length === 0 && (
          <>
            <div
              style={{
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={no_order} />
              </div>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "600",
                  fontSize: "1.2em",
                  textAlign: "center",
                }}
              >
                Your cart is empty
              </p>
              <Button
                style={{
                  background: "#109324",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1.2em",
                  padding: "10px 10px",
                  margin: "10px 10px",
                }}
                onClick={() => f7router.navigate("/deals")}
              >
                Explore
              </Button>
            </div>
          </>
        ))}
    </Tab>
  );
};

export default Orders;
