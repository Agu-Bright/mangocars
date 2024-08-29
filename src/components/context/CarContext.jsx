import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../data";
export const CarContext = createContext();
import { App } from "@capacitor/app"; // Import the App plugin

const CarContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [topDeals, setTopDeals] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [state, setState] = useState("unauthenticated");
  const [brand, setBrand] = useState("");
  const [valueS, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [topBrand, setTopBrand] = useState("");
  const [pageType, setPageType] = useState("");
  const [dealer, setDealer] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [order, setOrder] = useState([]);
  const [type, setType] = useState("upload");
  const [car, setCarUpdate] = useState({});
  const [update, setUpdate] = useState({});
  const [imageUpdate, setImageUpdate] = useState([]);

  const getAllCars = async ({
    searchQuery,
    page,
    brand,
    location,
    millage,
    activeYear,
  }) => {
    try {
      console.log(page);
      let link = `${URL}/products`;
      const queryParams = [];
      if (page !== null) {
        queryParams.push(`page=${page}`);
      }
      if (searchQuery) {
        queryParams.push(`search=${searchQuery}`);
      }
      if (brand) {
        queryParams.push(`brand=${brand}`);
      }
      if (location) {
        queryParams.push(`location=${location}`);
      }
      if (millage) {
        queryParams.push(`milage=${millage}`);
      }
      if (activeYear) {
        queryParams.push(activeYear);
      }

      if (queryParams.length > 0) {
        link += `?${queryParams.join("&")}`;
      }
      setLoading(true);
      const { data } = await axios.get(link);
      setTopDeals(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    App.addListener("appUrlOpen", (event) => {
      // Example: yourapp://auth?token=abc123
      const url = event.url;
      const token = new URL(url).searchParams.get("token");

      if (token) {
        // Handle the token, for example, authenticate the user
        console.log("Token from deep link:", token);
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await getAllCars({
        searchQuery: "",
        page: 1,
        brand: "",
        location: "",
        millage: "",
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/me`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAuth(data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (auth) {
      setState("authenticated");
    }
  }, [auth]);

  const clearFilter = () => {
    setValue("");
    setBrand("");
    setTopBrand("");
  };

  return (
    <CarContext.Provider
      value={{
        loading,
        topDeals,
        getAllCars,
        setTopDeals,
        setLoading,
        auth,
        setAuth,
        loadingUser,
        setLoadingUser,
        authOpen,
        setAuthOpen,
        state,
        setState,
        brand,
        setBrand,
        valueS,
        setValue,
        page,
        setPage,
        clearFilter,
        topBrand,
        setTopBrand,
        pageType,
        setPageType,
        dealer,
        setDealer,
        selectedChat,
        setSelectedChat,
        activeTab,
        setActiveTab,
        order,
        setOrder,
        type,
        setType,
        car,
        setCarUpdate,
        update,
        setUpdate,
        setImageUpdate,
        imageUpdate,
        authenticating,
        setAuthenticating,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
