import { popularBrands } from "../../data";
import CarCard from "./CarCard";
import { CarContext } from "../context/CarContext";
import { useContext, useEffect } from "react";
import login from "../../assets/login.svg";

const CarsList = ({ f7router, topDeals, loading, type }) => {
  const { brand, setBrand, clearFilter, setTopBrand, topBrand, auth } =
    useContext(CarContext);
  useEffect(() => {
    clearFilter();
  }, []);
  console.log("topDealzz", topDeals);
  return (
    <>
      {type !== "favourite" && (
        <ul className="py-4 flex gap-2 overflow-x-auto">
          {f7router && f7router.url === "/home" ? (
            <li
              onClick={() => clearFilter()}
              className={`px-6 py-1 w-max rounded-full ${
                !topBrand && "bg-primary text-black-100"
              }  ${topBrand ? "text-black-100 " : "text-zinc-100"}`}
            >
              All
            </li>
          ) : (
            <li
              onClick={() => clearFilter()}
              className={`px-6 py-1 w-max rounded-full ${
                !brand && "bg-primary text-black-100"
              }  ${brand ? "text-black-100 " : "text-zinc-100"}`}
            >
              All
            </li>
          )}

          {popularBrands.map(({ title }) => (
            <>
              {f7router && f7router.url === "/home" ? (
                <li
                  key={title}
                  onClick={() => {
                    setTopBrand(title);
                  }}
                  className={`px-6 py-1 w-max rounded-full border ${
                    topBrand === title && "bg-primary"
                  } border-zinc-600 text-zinc-600`}
                >
                  {title}
                </li>
              ) : (
                <li
                  key={title}
                  onClick={() => {
                    setBrand(title);
                  }}
                  className={`px-6 py-1 w-max rounded-full border ${
                    brand === title && "bg-primary"
                  } border-zinc-600 text-zinc-600`}
                >
                  {title}
                </li>
              )}
            </>
          ))}
        </ul>
      )}
      {!loading && topDeals && topDeals.products.length > 0 && (
        <ul className="grid grid-cols-2 gap-4">
          {topDeals?.products.map((car) => (
            <li key={car?._id}>
              <CarCard f7router={f7router} i={car?._id} car={car} />
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <ul className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((car) => (
            <li key={car}>
              <CarCard loading={loading} />
            </li>
          ))}
        </ul>
      )}
      {!loading && topDeals && topDeals?.products.length === 0 && (
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
              No Car Found{" "}
            </p>
            {(auth?.role === "seller" || auth?.role === "admin") && (
              <button
                onClick={() => f7router.navigate("/post")}
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
                Upload{" "}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CarsList;
