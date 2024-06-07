import {
  // ChevronDownIcon,
  HeartIcon as HIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Avatar, Rating } from "@mui/material";
import { BellIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Link, Tab } from "framework7-react";
import { createElement, useEffect, useState, useContext } from "react";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { banner2, lexus } from "../assets";
import CarsList from "../components/home/CarsList";
import SearchBar from "../components/home/SearchBar";
import SpecialOffer from "../components/home/SpecialOffer";
import AllBrands from "../components/home/allBrands";
import { banners, popularBrands } from "../data";
import { moneyFormat } from "../functions";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { URL } from "../data";
import { CarContext } from "../components/context/CarContext";
import { ToastContainer } from "react-toastify";

function getGreeting() {
  const currentHour = new Date().getHours();
  console.log(currentHour);
  const morningStart = 0;
  const afternoonStart = 12;
  const eveningStart = 18;
  function getTimeOfDay(hour) {
    if (hour >= morningStart && hour < afternoonStart) {
      return "morning";
    } else if (hour >= afternoonStart && hour < eveningStart) {
      return "afternoon";
    } else {
      return "evening";
    }
  }
  // Get the time of day
  const timeOfDay = getTimeOfDay(currentHour);
  switch (timeOfDay) {
    case "morning":
      return "Good morning!";
    case "afternoon":
      return "Good afternoon!";
    case "evening":
      return "Good evening!";
    default:
      return "Hello!";
  }
}

const Home = ({ f7router }) => {
  const {
    loading,
    auth,
    loadingUser,
    setAuthOpen,
    setLoading,
    clearFilter,
    topBrand,
  } = useContext(CarContext);

  const [allBrands, setAllBrands] = useState(null);
  const [showAllBrands, setShowAllBrands] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [topDeals2, setTopDeals2] = useState(null);
  useEffect(() => {
    clearFilter();
    fetch(
      "https://private-anon-026b45e69d-carsapi1.apiary-mock.com/manufacturers"
    ).then((res) => res.json().then((data) => setAllBrands(data)));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const queryParams = [];
        let link = `${URL}/products`;
        if (topBrand) {
          queryParams.push(`brand=${topBrand}`);
        }
        if (queryParams.length > 0) {
          link += `?${queryParams.join("&")}`;
        }
        setLoading(true);
        const { data } = await axios.get(link);
        setTopDeals2(data);
        setLoading(false);
      } catch (error) {
        console.log(error?.response?.data?.message);
        setLoading(false);
      }
    })();
  }, [topBrand]);

  useEffect(() => {
    // Add event listener to handle deep links
    const handleDeepLink = (event) => {
      console.log(event);
      const { url } = event.detail;
      if (url.startsWith("/update-email")) {
        //Handle deep link to update email
        console.log("navigating");
        // f7router.navigate("/update-email");
      }
    };

    // Add event listener for deep linking
    document.addEventListener("deepLink", handleDeepLink);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("deepLink", handleDeepLink);
    };
  }, []);
  const [trending, setTrending] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/trendingProducts`);
        setTrending(data?.trendingProduct);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Tab id="home" className="page-content pb-20" tabActive>
      <AllBrands
        allBrands={allBrands}
        showAllBrands={showAllBrands}
        setShowAllBrands={setShowAllBrands}
      />
      <nav className="flex p-4 gap-2">
        {auth && !loadingUser ? (
          <button
            onClick={() => f7router.navigate("/profile")}
            className="p-2 w-max h-max bg-zinc-200 text-zinc-500 rounded-full aspect-square"
          >
            {/* <UserIcon className="h-8" /> */}
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                background: "#223822",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {auth?.name[0].toUpperCase()}
            </Avatar>
          </button>
        ) : (
          <>
            {loadingUser ? (
              <button className="p-2 w-max h-max bg-zinc-200 text-zinc-500 rounded-full aspect-square">
                <Skeleton variant="circular" width={40} height={40} />
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="p-2 w-max h-max bg-zinc-200 text-zinc-500 rounded-full aspect-square"
              >
                {/* <UserIcon className="h-8" /> */}
                <Avatar
                  sx={{
                    width: "40px",
                    height: "40px",
                    background: "#223822",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ?
                </Avatar>
              </button>
            )}
          </>
        )}
        {auth && !loadingUser ? (
          <div className="flex flex-col">
            <small className="text-zinc-500 text-sm font-medium">
              {getGreeting()} 👋{" "}
            </small>
            {auth && <h2 className="text-xl font-semibold">{auth?.name}</h2>}
          </div>
        ) : (
          <>
            {loadingUser ? (
              <>
                <div className="flex flex-col" style={{ marginTop: "7px" }}>
                  <small className="text-zinc-500 text-sm font-medium">
                    <Skeleton
                      variant="rectangular"
                      width={70}
                      height={10}
                      sx={{ borderRadius: "5px" }}
                    />
                  </small>
                  <small className="text-zinc-500 text-sm font-medium">
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={10}
                      sx={{ borderRadius: "5px", marginTop: "5px" }}
                    />
                  </small>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <small className="text-zinc-500 text-sm font-medium">
                    {getGreeting()} 👋{" "}
                  </small>
                </div>
              </>
            )}
          </>
        )}
        <BellIcon
          onClick={() => f7router.navigate("/notifications")}
          className="h-6 ml-auto text-zinc-500 mt-1"
        />
        <HeartIcon
          onClick={() => f7router.navigate("/favourite")}
          className="h-6 ml-2 text-zinc-500 mt-1 "
        />
      </nav>
      <SearchBar f7router={f7router} />
      <div className="flex p-4 justify-between items-end font-semibold text-lg">
        <h3>Special Offers</h3>
        <Link href="/offers" className="text-sm text-primary">
          See All
        </Link>
      </div>
      <div className="pl-4">
        <Swiper spaceBetween={16} slidesPerView={1.1}>
          {banners.map((image, i) => (
            <SwiperSlide key={i} className="">
              <SpecialOffer i={i} image={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="px-4 py-6 grid grid-cols-4 gap-x-12 gap-y-4">
        {popularBrands.map(({ icon, title }) => (
          <button
            onClick={() => f7router.navigate("/deals/" + title)}
            key={title}
            className=" flex flex-col justify-center items-center gap-1 "
          >
            <div className="bg-zinc-200 text-zinc-700 rounded-full aspect-square flex justify-center items-center w-full">
              {title != "Lexus" ? (
                createElement(icon, { className: "text-2xl" })
              ) : (
                <img src={lexus} className="h-6" />
              )}
            </div>
            <h6 className="font-semibold text-sm">{title}</h6>
          </button>
        ))}
        <button
          onClick={() => setShowAllBrands(true)}
          className=" flex flex-col justify-center items-center gap-1 "
        >
          <div className="bg-zinc-200 text-zinc-700 rounded-full aspect-square flex justify-center items-center w-full">
            <IoEllipsisHorizontalCircle className="text-2xl" />
          </div>
          <h6 className="font-semibold text-sm">More</h6>
        </button>
      </div>
      <section className="p-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Top Deals</h2>
            <p className="text-zinc-400 font-medium text-xs">
              {topDeals2?.productsCount} results
            </p>
          </div>
          {/* <div className="relative">
            <select
              style={{
                border: "1px solid rgb(82 82 91)",
                borderRadius: ".25rem",
                padding: ".25rem 1rem",
                paddingRight: "2rem",
              }}
              className="border rounded py-1 px-2 border-zinc-600"
            >
              <option value="">Select</option>
            </select>
            <ChevronDownIcon className="h-4 absolute right-2 top-2" />
          </div> */}
          <h4
            style={{ color: "green", fontWeight: "600", fontSize: "1.2em" }}
            onClick={() => f7router.navigate("/deals")}
          >
            see more
          </h4>
        </div>

        <CarsList f7router={f7router} topDeals={topDeals2} loading={loading} />
        {trending && (
          <div className="flex justify-between mt-6 mb-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Hot car of the week</h2>
            </div>
          </div>
        )}
        {/* Trending car */}
        {trending && (
          <Link href={`/cars/${trending?._id}`} className="block p-0 m-0">
            <div className="rounded bg-gradient-to-br from-primary/20 to-secondary/10 p-4 relative">
              <button className="absolute top-1 right-1 bg-zinc-500/50 text-zinc-50 p-2 rounded-full w-max h-max ">
                <HIcon className="h-4" />
              </button>
              <img
                src={trending?.images[0]?.url}
                className="aspect-[7/5] rounded"
                alt="trending"
              />
            </div>
            <div className="pt-2">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-xl">{trending?.name}</h4>
                <div className="bg-zinc-200 rounded px-2 py-1 h-max w-max">
                  {trending?.carStatus}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <p className="">{moneyFormat(trending?.price)}</p>
                <div className="flex-col text-right">
                  {trending?.rating}/5
                  {/* <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className={`h-2 ${
                        i <= 4 ? "text-amber-500" : "text-zinc-500"
                      }`}
                    />
                  ))}
                </div> */}
                  <Rating name="read-only" value={trending?.rating} readOnly />
                </div>
              </div>
            </div>
          </Link>
        )}
        {/* <Link href="/cars/6" className="block p-0 m-0">
          <div className="rounded bg-gradient-to-br from-primary/20 to-secondary/10 p-4 relative">
            <button className="absolute top-1 right-1 bg-zinc-500/50 text-zinc-50 p-2 rounded-full w-max h-max ">
              <HIcon className="h-4" />
            </button>
            <img src={banner2} className="aspect-[7/5] rounded" alt="" />
          </div>
          <div className="pt-2">
            <div className="flex justify-between mb-2">
              <h4 className="font-semibold text-xl">Mercedes ES 350 (2010)</h4>
              <div className="bg-zinc-200 rounded px-2 py-1 h-max w-max">
                Used
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <p className="">{moneyFormat(10000000)}</p>
              <div className="flex-col text-right">
                4.5/5
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className={`h-2 ${
                        i <= 4 ? "text-amber-500" : "text-zinc-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link> */}
      </section>
      <ToastContainer />
    </Tab>
  );
};
export default Home;
