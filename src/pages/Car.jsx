import {
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  HeartIcon,
  PhoneIcon,
  // StarIcon,
} from "@heroicons/react/20/solid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { Link } from "framework7-react";
import PageLayout from "../components/App/PageLayout";
import CarCard from "../components/home/CarCard";
import Comment from "../components/home/Comment";
import { URL } from "../data";
import { moneyFormat } from "../functions";
import { Swiper, SwiperSlide } from "swiper/react";
import CallPopup from "../components/App/CallPopup";
import { CircularProgress, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../css/setup.css";
import { CarContext } from "../components/context/CarContext";

const Car = ({ f7route, f7router }) => {
  const { id } = f7route.params;

  const { setSelectedChat, setAuthOpen, auth, setCarUpdate, setType, type } =
    useContext(CarContext);
  const [callOpen, setCallOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [relatedCars, setRelatedCars] = useState([]);
  const [car, setCar] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${URL}/product/${id}`);
      setCar(data?.product);
      if (data?.product?.user?._id) {
        const res = await axios.get(
          `${URL}/products?user=${data?.product?.user?._id}`
        );
        setRelatedCars(res?.data?.products);
      }
    })();
  }, [URL]);

  const handleAccessChat = async (f7router, car) => {
    try {
      //access chat
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/access`,
        {
          userId: car?.user?._id,
          car: car?._id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedChat(data);
      setLoading(false);
      f7router.navigate("/chat/" + car?._id);
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
      setLoading(false);
    }
  };

  const [isliked, setIsLiked] = useState(false);

  const handleAddLike = async (id) => {
    if (isliked) {
      setIsLiked(false);
    }
    if (!isliked) {
      setIsLiked(true);
    }
    try {
      const { data } = await axios.get(`${URL}/add-like/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    car &&
      (async () => {
        try {
          const { data } = await axios.get(`${URL}/me`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(data);
          const liked = data?.user?.likedProducts.find(
            (item) => item === car?._id
          );
          console.log("liked", liked);
          if (data?.user?.likedProducts.find((item) => item === car?._id)) {
            setIsLiked(true);
          }
        } catch (error) {
          console.log(error);
        }
      })();
  }, [car]);
  const [adding, setAdding] = useState(false);
  const handleAddToCart = async (id) => {
    try {
      setAdding(true);
      const { data } = await axios.get(`${URL}/add-cart/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAdding(false);
      toast.success("Cart Item Added", {
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
      // f7router.navigate("/orders");
    } catch (error) {
      setAdding(false);
      toast.error(error?.response?.data?.message, {
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
      if (error.response?.data?.message === "") {
        setAuthOpen(true);
      }
    }
  };

  const handleEdit = () => {
    console.log("edit");
    setType("update");
    setCarUpdate(car);

    if (type === "update") {
      f7router.navigate("/post");
    }
  };

  return (
    <PageLayout title={car?.name} f7router={f7router}>
      <CallPopup callOpen={callOpen} setCallOpen={setCallOpen} car={car} />
      <CallPopup
        callOpen={commentOpen}
        setCallOpen={setCommentOpen}
        car={car}
        type="comment"
      />
      {car && (
        <>
          <section className="p-4 flex flex-col gap-2 relative">
            {auth?._id === car?.user?._id && (
              <button
                onClick={() => handleEdit()}
                className="absolute top-5 left-5 bg-zinc-500/50 text-zinc-50 p-2 rounded-full w-max h-max "
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleAddLike(car?._id)}
              className="absolute top-5 right-5 bg-zinc-500/50 text-zinc-50 p-2 rounded-full w-max h-max "
            >
              <HeartIcon
                className="h-4"
                style={{ color: `${isliked ? "green" : "white"}` }}
              />
            </button>
            <FavoriteBorderIcon
              sx={{ visibility: "hidden" }}
              // onClick={() => console.log("clicked")}
            />
            <div>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={true}
                modules={[Pagination]}
              >
                {car?.images.map((image) => (
                  <SwiperSlide key={image?._id}>
                    <img
                      src={image?.url}
                      className="aspect-[7/5] rounded"
                      alt={image?.public_id}
                    />{" "}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-xl">{car?.name}</h4>
                <div className="bg-zinc-200 rounded px-2 py-1 h-max w-max">
                  {car?.carStatus}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-primary text-base font-medium">
                  {moneyFormat(car?.price)}
                </p>
                <div className="flex-col text-right">
                  {car?.rating}/5
                  <div className="flex">
                    <Rating
                      name="read-only"
                      value={car?.rating}
                      sx={{ fontSize: "15px" }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 font-medium">
              <button
                onClick={() => setCallOpen(true)}
                className="border border-primary py-2 rounded flex gap-2 justify-center items-center text-primary"
              >
                <PhoneIcon className="h-4" /> Call Seller
              </button>
              {!loading && (
                <button
                  onClick={() => handleAccessChat(f7router, car)}
                  className=" bg-primary text-white py-2 rounded  flex gap-2 justify-center items-center"
                >
                  <ChatBubbleLeftEllipsisIcon className="h-4" /> Chat Seller
                </button>
              )}
              {loading && (
                <button className=" bg-primary text-white py-2 rounded  flex gap-2 justify-center items-center">
                  <CircularProgress sx={{ color: "white" }} size={20} />
                </button>
              )}
            </div>
          </section>
          <hr className="w-full border-4 border-zinc-200" />
          <section>
            <div className="p-4 grid grid-cols-2 gap-4 text-base">
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">
                  Car Condition
                </h4>
                <p>{car?.carCondition}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">Body</h4>
                <p>First Body</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">Car Type</h4>
                <p>{car?.carType}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">
                  Year Manufactured
                </h4>
                <p>{car?.year}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">Colour</h4>
                <p>{car?.carColour}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">
                  Car Registered
                </h4>
                <p>{car?.carRegistered}</p>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-xs text-primary">
                  Transmission
                </h4>
                <p>{car?.transmission}</p>
              </div>
              <div className="flex items-end justify-start">
                <h4
                  onClick={() => setSeeMore((prev) => !prev)}
                  className="font-semibold text-xs text-primary border-b border-b-primary"
                >
                  View More
                </h4>
              </div>
            </div>
            {seeMore && (
              <div className="p-4 grid grid-cols-2 gap-4 text-base">
                {car?.description}
              </div>
            )}
            <div className="p-4">
              <button
                onClick={() => handleAddToCart(car?._id)}
                className="py-2 bg-primary text-white text-lg font-semibold rounded"
              >
                {adding ? (
                  <CircularProgress size={15} sx={{ color: "white" }} />
                ) : (
                  "Click to Order"
                )}
              </button>
            </div>
          </section>
          <hr className="w-full border-4 border-zinc-200" />
          <section className="p-4">
            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                  {car?.user?.name} Motors
                </h2>
                <div className="flex gap-2">
                  <div className="px-2 py-1 text-xs bg-green-100 rounded font-medium text-primary flex gap-0.5">
                    <CheckBadgeIcon className="h-4" /> Verified Seller
                  </div>
                  <div className="px-2 py-1 text-xs bg-zinc-100 rounded text-zinc-500">
                    Last Posted a week ago
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {relatedCars &&
                relatedCars.length > 0 &&
                [relatedCars[0], relatedCars[1]].map((car) => (
                  <CarCard
                    key={car?._id}
                    f7router={f7router}
                    car={car}
                    i={car?._id}
                  />
                ))}
              {relatedCars && relatedCars.length === 0 && (
                <div>
                  <p>There is no other post by this user</p>
                </div>
              )}
              {/* <CarCard f7router={f7router} car={cars[1]} i={1} /> */}
            </div>
            <button
              onClick={() => {
                console.log(`/dealer/${car?.user?._id}`);
                f7router.navigate(`/dealer/${car?.user?._id}`);
              }}
              className="flex gap-1 items-center justify-center w-full py-2 border border-primary rounded text-primary font-semibold text-lg mt-4"
            >
              View this seller&#39;s posts
              <ChevronDoubleRightIcon className="w-6 mt-1" />
            </button>
          </section>
          <hr className="w-full border-4 border-zinc-200" />
          <section className="p-4">
            <div className="flex justify-between font-semibold">
              <h4>
                {car?.reviews?.length}
                {car?.reviews?.length <= 0 ? "commments" : "commment"}
              </h4>
              <Link
                href="/comments"
                className="text-primary flex items-center "
              >
                View all comments <ChevronRightIcon className="h-5" />
              </Link>
            </div>
            <ul className="mt-4">
              {car?.reviews.map((review, i) => (
                <>
                  <Comment comment={review} key={i} />
                  {/* {comment?.replies?.map((reply, i) => (
                    <Comment comment={reply} reply={true} key={i} />
                  ))} */}
                </>
              ))}
            </ul>
          </section>
          <hr className="w-full border-4 border-zinc-200" />
          <div className="p-4">
            <button
              onClick={() => setCommentOpen(true)}
              className="w-full py-2 border border-primary rounded text-primary font-semibold text-lg"
            >
              Add Comment
            </button>{" "}
          </div>
        </>
      )}
      {/* <ToastContainer /> */}
    </PageLayout>
  );
};

export default Car;
