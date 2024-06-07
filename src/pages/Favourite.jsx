// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useContext, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import CarsList from "../components/home/CarsList";
// import SearchBar from "../components/home/SearchBar";
import { CarContext } from "../components/context/CarContext";
// import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { URL } from "../data";
import nofav from "../assets/nofav.svg";
import login from "../assets/login.svg";

const Favourite = ({ f7router, f7route }) => {
  const {
    loading,
    getAllCars,
    brand,
    valueS,
    setValue,
    page,
    setPage,
    auth,
    setAuthOpen,
  } = useContext(CarContext);
  const { search } = f7route.params;

  useEffect(() => {
    if (search) {
      setValue(search);
    }
  }, [search]);

  const handleChange = (e, value) => {
    console.log(value);
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      await getAllCars({
        page: page,
        searchQuery: valueS,
        brand: brand,
      });
    })();
  }, [page, valueS, location, brand]);

  const [likedProducts, setLikedProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/get-liked`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("liked", data);
        setLikedProducts({ products: data?.user?.likedProducts });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!auth) {
    return (
      <PageLayout title={"Favourite Cars"} f7router={f7router}>
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

  return (
    <PageLayout title={"Favourite Cars"} f7router={f7router}>
      <div className="px-4">
        {likedProducts?.products && likedProducts?.products.length > 0 && (
          <CarsList
            type="favourite"
            f7router={f7router}
            topDeals={likedProducts}
            loading={loading}
          />
        )}
        {!likedProducts?.products ||
          (likedProducts?.products.length === 0 && (
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
              <img src={nofav} alt="no-favourite" />
              <p
                style={{
                  paddingTop: "55px",
                  fontWeight: "800",
                  fontSize: "20px",
                }}
              >
                You have no favourite car{" "}
              </p>
              <button
                onClick={() => f7router.navigate(`/home`)}
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
          ))}
      </div>
    </PageLayout>
  );
};

export default Favourite;
