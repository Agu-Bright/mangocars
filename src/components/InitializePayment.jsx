import axios from "axios";
import { PaystackConsumer } from "react-paystack";
import { URL } from "../data";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function InitializePayment({ email, amount, item, f7router, handleRemove }) {
  const [loading, setLoading] = useState(false);
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_5d67915325c90b410bc427c84496492dcde14f08",
    metadata: {
      custom_fields: [
        {
          items: item,
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

  // you can call this function anything
  const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    //verify payment
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${URL}/payment/verify${reference?.redirecturl}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      let sellers = [];
      item.forEach((element) => {
        sellers.push(element.user);
      });
      if (sellers.length > 0) {
        //create order
        const OrderUpload = {
          // shippingInfo: shippingInfo,
          orderItems: item[0]?._id,
          paymentInfo: {
            id: reference?.trxref,
            status: data.status,
          },
          orderId: reference?.trxref,
          paidAt: data?.paidAt,
          itemsPrice: Number(data.amount) / 100,
          //   taxPrice: Number(data.fees) / 100,
          //   shippingPrice: data.metadata.shippingPrice,
          totalPrice: Number(data.amount) / 100,
          paymentMethod: data?.channel,
          sellers: item[0]?.user,
        };

        try {
          const { data } = await axios.post(`${URL}/order/new`, OrderUpload, {
            withCredentials: true,
            credentials: "include",
          });
          console.log(data);
          handleRemove(item[0]._id);
          f7router.navigate(`/successful/${data?.order?._id}`);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <div>
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button
            className="py-2 bg-primary text-white text-lg font-semibold rounded mt-4 p-5"
            onClick={() =>
              !loading ? initializePayment(handleSuccess, handleClose) : ""
            }
          >
            {!loading && " Make Payment"}
            {loading && <CircularProgress sx={{ color: "white" }} size={20} />}
          </button>
        )}
      </PaystackConsumer>
    </div>
  );
}

export default InitializePayment;
