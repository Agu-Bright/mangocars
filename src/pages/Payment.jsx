import {
  BanknotesIcon,
  ChevronRightIcon,
  CreditCardIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { googlepay, paystack } from "../assets";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Tab } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "../components/context/CarContext";
import { usePaystackPayment } from "react-paystack";

const Payment = ({ f7router }) => {
  const { order, setOrder, auth } = useContext(CarContext);
  order && console.log("paystack-order", order);
  const [config, setConfig] = useState();
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (order.length > 0) {
      setConfig({
        reference: new Date().getTime().toString(),
        email: auth?.email,
        amount: Number(order[0].price),
        publicKey: "pk_live_fe507c1de8e0266d58894572f6bf05a081200dbf",
      });
    }
    return () => {
      setOrder([]);
    };
  }, []);

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  return (
    <Tab id="payments" className="page-content">
      <nav className="flex gap-4 p-4 text-lg text-center items-center bg-zinc-100 font-bold">
        <h2>Payment Method</h2>
      </nav>
      <ul className="flex flex-col font-medium py-4">
        <li className="p-4 flex items-center gap-4 border-b active:opacity-70 active:bg-zinc-100/5">
          <div className="w-10 flex justify-center">
            <CreditCardIcon className="h-6 text-primary" />
          </div>
          Pay with Debit Card
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>
        <li className="p-4 flex items-center gap-4 border-b active:opacity-70 active:bg-zinc-100/5">
          <div className="w-10 flex justify-center">
            <BanknotesIcon className="h-6 text-primary" />
          </div>
          Pay with Cash
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>

        <li
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
          className="p-4 flex items-center gap-4 border-b active:opacity-70 active:bg-zinc-100/5"
        >
          <img src={paystack} alt="" className="w-10 object-contain" />
          Pay with Paystack
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>

        <li className="p-4 flex items-center gap-4 border-b active:opacity-70 active:bg-zinc-100/5">
          <img src={googlepay} alt="" className="w-10 h-6 object-cover" />
          Pay with Google Pay
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>
        <li
          onClick={() => f7router.navigate("/add_card")}
          className="p-4 flex items-center gap-4 border-b active:opacity-70 active:bg-zinc-100/5"
        >
          <div className="w-10 flex justify-center">
            <PlusIcon className="h-6" />
          </div>
          Add Debit Card
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>

        <li
          onClick={() => f7router.navigate("/transactions")}
          className="p-4 w-full flex items-center gap-4 absolute bottom-14 border-t active:opacity-70 active:bg-zinc-100/5"
        >
          <div className="w-10 flex justify-center">
            <ClockIcon className="h-6" />
          </div>
          View Transaction History
          <ChevronRightIcon className="h-6 ml-auto" />
        </li>
      </ul>
    </Tab>
  );
};

export default Payment;
